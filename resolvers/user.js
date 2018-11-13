export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),

    user: async (parent, { id }, { models }) => await models.User.findById(id),

    currentUser: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return await models.User.findById(me.id);
    }
  },
  Mutation: {
    signupUser: async (root, {firstName, lastName, email, userName, password}, {User}) => {

      const user = await User.findOne({email, userName});

      if(user){
          throw new Error('User already exits');
      }

      const newUser = await new User({
          firstName, 
          lastName,
          email,
          userName,
          password
      }).save();

      return {token: createToken(newUser, process.env.JWT_SECRET, "1hr")};
  },
  signinUser: async (root, {email, password }, {User}) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('User Not Found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        throw new Error('inValid password');
    }

    return {token: createToken(user, process.env.JWT_SECRET, "1hr")};

},

editProfile: async (root, {email, bio}, {User}) => {

    const user = await User.findOneAndUpdate({email}, {$set: {bio}}, {new: true});

    if(!user){
        throw new Error('User Not Found');
    }

    return user;
},
  }
};
