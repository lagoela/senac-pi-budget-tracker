"use client";

import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TransactionType } from "@/lib/types";
interface Props {
  trigger: React.ReactNode;
  category: Category;
}

function DeleteCategoryDialog({ category, trigger }: Props) {
  const categoryToastId = `${category.name}-${category.type}`;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Categoria deletada com sucesso", { id: categoryToastId });

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: () => {
      toast.error("Ocorreu um erro ao deletar a categoria", {
        id: categoryToastId,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar essa categoria?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível e sua categoria será permanentemente
            deletada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deletando categoria...", { id: categoryToastId });
              deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType,
              });
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
