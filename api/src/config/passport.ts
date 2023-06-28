import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import config from './config';
import db from './database';

const jwtOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const params = { TableName: config.usersTable, Key: { userId: jwtPayload.sub } };
      const { Item } = await db.get(params).promise();
      if (Item && Item.userId === jwtPayload.sub) return done(null, Item);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
