import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = [
  {
    name: "Hernán",
  },
  {
    name: "Fausto",
  },
  {
    name: "Andrés",
  },
];

export const login = (req, res) => {

  const { name } = req.body;
  const index = users.findIndex((aUser) => aUser.name === name);

  if (index < 0) res.status(401).json({ msg: "no estas autorizado" });
  else {
    req.session.name = name;
    res.redirect("/home");
  }
};

export const getSession = (req, res) => {

  const name = req.session?.name;

  if (name) {
    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname, "../../views/login.html"));
  }
};

export const logout = (req, res) => {

  const name = req.session?.name;

  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(__dirname, "../../views/pages/logout.ejs"), {
          name,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
};

export const infoSession = (req, res) => {
  
  res.render(path.join(__dirname, "../../views/pages/home.ejs"), {
    name: req.session.name,
  });
};
