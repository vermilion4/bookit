var express = require('express');
var router = express.Router();

const Book = require('../model/bookit')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BookIt' });
});

router.post('/', function (req,res){
    const{ bookname } = req.body;

    Book.findOne({bookname:bookname})
        .then(book=>{
            if(book){
                console.log(book)
                res.render('search',{record:book,title:'BookIt'})
            }
            else{
                res.render('search', {records: 'No record found',title:'BookIt'})
            }
        })
        .catch(err=> console.log(err))

})

router.get('/addbook', function (req,res){
  res.render('addbook', {title: 'BookIt'});
})

router.post('/addbook', function (req,res){
  const { bookname,author } = req.body;

    const errors =[]

  Book.findOne({bookname:bookname})
      .then(book => {
        if(book){
          errors.push({msg:'Book already added'})
          res.render('addbook',{errors, title: 'BookIt'})
        }
        else{
          const newBook = new Book({
            bookname,
              author
          })
            newBook.save()
                .then(book=>{
                    req.flash('success_msg', 'Book has been registered successfully');
                    res.redirect('/addbook');
                })
                .catch(err=>console.log(err))

        }
      })
    })

router.get('/library', function(req,res){
    Book.find({}, function (err,result){
    if(err){
        console.log(err)
    }
    else{
        res.render('library',{title: 'BookIt', records:result })
    }
    })

})

module.exports = router;
