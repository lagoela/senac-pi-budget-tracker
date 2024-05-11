"use server";

import prisma from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transactions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { amount, category, date, description, type } = parsedBody.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("Categoria não encontrada");
  }

  // NOTA: Não confundir $transaction ( prisma ) com prisma.transaction (table)
  // $transaction é uma palavra reservada do SQL e significa que inciamos uma transacao SQL

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description: description || "",
        type,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
      },
    }),

    // Dar update nas tabela agregadas (historico de mes e ano)
    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId: user.id,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        expense: type === "despesa" ? amount : 0,
        income: type === "renda" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "despesa" ? amount : 0,
        },
        income: {
          increment: type === "renda" ? amount : 0,
        },
      }
    }),

    prisma.yearHistory.upsert({
        where: {
          month_year_userId: {
            userId: user.id,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
          },
        },
        create: {
          userId: user.id,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          expense: type === "despesa" ? amount : 0,
          income: type === "renda" ? amount : 0,
        },
        update: {
          expense: {
            increment: type === "despesa" ? amount : 0,
          },
          income: {
            increment: type === "renda" ? amount : 0,
          },
        }
      }),
  ]);
}
