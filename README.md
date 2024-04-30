## Setando o ambiente virtual

Selecione a pasta que deseja fazer o pull da Branch

Depois, adicione a branch no seu remote:
```bash
git remote add origin https://github.com/lagoela/senac-pi-budget-tracker.git
```

Após isso, faça um pull da branch dev or main

**Lembre-se de publicar alterações apenas na branch dev**
```bash
git pull origin dev
```
Pronto, você ja terá o código mais recente.
Sempre que for trabalhar no código, faça um fetch:
```bash
git fetch
```
## Trocando de branches
### Para trocar entre as branches, é muito simples:
```bash
git checkout dev
# or
git checkout main
```

## Instalando dependencias
Ao baixar localmente o repositório em sua maquina, utilize:
```bash
npm install
```
**Verifique se seu terminal está no mesmo local que o repositório**

## Executando o servidor
Para executar o servidor, basta utilizar o comando:
```bash
npm run dev
```

Abra o endereço [http://localhost:3000](http://localhost:3000) no seu navegador para entrar no projeto.
