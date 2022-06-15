
import db from '../models/index';
import CRUDService from '../services/CRUDServices';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
    
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let postCRUD = async (req, res) => {

    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD from server');
}
let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
    // return res.send('Display get crud from homecontroller');
}

let getEditCRUD = async(req, res) => {
    let useIid = req.query.id;
    console.log(req.query.id);
    if (useIid) {
        let userData = await CRUDService.getUserInfoById(useIid);
        // console.log('--------------');
        // console.log(userData);
        // console.log('--------------'); 
        // return res.send('Found a user!');
        return res.render('editCRUD.ejs', {
            user: userData
        });

    }
    else {
        return res.send('User not found');
    }

}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs',{
        dataTable: allUsers
    });

}

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if (id){
        let deleteUsers = await CRUDService.deleteUserById(id);
        return res.send('Delete user success!');
        // return res.render('displayCRUD.ejs',{
        //     dataTable: deleteUsers
        // });
    }
    else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD:  getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}