module.exports = {
    apps: [
      {
        name: "back2",
        script: "yarn",
        args: "start",  // Esse comando executa o yarn start
        cwd: "./", // Diretório onde o PM2 deve procurar os arquivos
        watch: false, // Defina como true se você quiser que o PM2 observe as mudanças no código
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  