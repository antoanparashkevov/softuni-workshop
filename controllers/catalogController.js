//comment out the old service that uses the FS module
// const {getAll, getById} = require("../services/accomodationService");

const {getById, getAll} = require("../services/roomService")
const router = require('express').Router()

router.get('/', async (req,res)=>{
    
    // const objQueries = {
    //     name: req.query.name || '',
    //     location: req.query.location || '',
    //     fromPrice:+req.query.fromPrice || 1,
    //     toPrice: +req.query.toPrice || 1000
    //    
    // }
    
    const roomsFromDB = await getAll()
    res.render('pages/catalog',{
        title: 'Catalog page',
        roomsFromDB,
        // name:objQueries.name,
        // location:objQueries.location,
        // fromPrice:objQueries.fromPrice,
        // toPrice:objQueries.toPrice,
    })
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const room = await getById(id); 
    
    if(req.user && req.user._id == room.owner) {
        room.isOwner = true
    }
    
    if(room){
        res.render('pages/details',{
            title: 'Details for ' + room.name,
            room
        })
    }else {
        res.render('pages/pageNotFound',{
            title: `Code ${id} not found`,
            id
        })
    }
   
})

module.exports = router