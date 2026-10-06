# Deploy VPS — LP Nature

A LP já está configurada e no ar na VPS (Nginx, PM2, `.env` e SSL).
Para publicar uma atualização:

```bash
cd /var/www/lp-nature && bash deploy/deploy.sh
```

O script:

1. `git pull --ff-only` no branch atual
2. Instala dependências
3. Faz o build — API roda `apps/api/server.ts` direto no Node (sem build); o build gera `apps/web/dist`.
4. `pm2 reload` só nos processos PM2 cujo diretório fica dentro de `/var/www/lp-nature`
5. `pm2 save`

Não altera Nginx, portas nem `.env`.

## Verificar

```bash
pm2 list
pm2 logs <id> --lines 40
```
