const { exec } = require("child_process");

const commands = [
  {
    path: "C:\\Users\\Ankan\\OneDrive\\Documents\\GitHub\\Blog-Website\\client",
    command: "npm run dev",
  },
  {
    path: "C:\\Users\\Ankan\\OneDrive\\Documents\\GitHub\\Blog-Website\\server\\ApiGateway",
    command: "npm start",
  },
  {
    path: "C:\\Users\\Ankan\\OneDrive\\Documents\\GitHub\\Blog-Website\\server\\BlogService",
    command: "npm start",
  },
  {
    path: "C:\\Users\\Ankan\\OneDrive\\Documents\\GitHub\\Blog-Website\\server\\UserService",
    command: "npm start",
  },
];

// Open 4 CMD windows, cd to each path, and run the respective command
commands.forEach(({ path, command }) => {
  exec(`start cmd /K "cd ${path} && ${command}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});
