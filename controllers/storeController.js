exports.myMiddleware = (req, res, next) => {
    req.name = 'dogu';
    if(req.name === 'dogu'){
        throw Error('that is a beatiful name');
    }
    res.cookie('name', 'dogu is cool', {maxAge: 90000});
    next();
};

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
};

 