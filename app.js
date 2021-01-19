require("dotenv").config();
const dependencies = require('./services/dependencies')
const app = dependencies.express();
app.set('port', process.env.PORT || 5000)

const projectRouter = require('./routes/todo-list');


// connection mongo server

dependencies.mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        keepAlive: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Connected to todo-list-forines `))
    .catch((err) => console.error(err));

// cors setup
app.use(dependencies.cors({
    credentials:true,
    origin: [
        "http://todo.unaigo.com", 
        "https://todo.unaigo.com", 
        "https://organise-forines.web.app", 
        "https://organise-forines.firebaseapp.com", 
        "http://www.fontawesome.com", 
        "http://localhost:3000"]
}));

app.use(dependencies.logger('dev'));
app.use(dependencies.bodyParser.json());
app.use(dependencies.bodyParser.urlencoded({ extended: false }));
app.use(dependencies.express.json());
app.use(dependencies.cookieParser());
app.use('/public',  dependencies.express.static(dependencies.path.join(__dirname, 'public')));


app.use('/', projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });

  module.exports = app