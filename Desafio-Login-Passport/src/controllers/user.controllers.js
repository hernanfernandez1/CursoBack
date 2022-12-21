import passport from "passport";

const passportOptions = {
  badLogin: "username / password inválido"
};

export const signUp = (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    res.json({ msg: "Registrado con éxito" });
  })(req, res, next);
};

export const login = (req, res, next) => {
  passport.authenticate("login", passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    res.json({ msg: `Bienvenido ${user.username}`, user: req.user });
  })(req, res, next);
};

export const getHome = (req, res) => {
  res.json(req.session);
};

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
    });
    res.send({ msg: "Hasta Luego" });
  });
};
