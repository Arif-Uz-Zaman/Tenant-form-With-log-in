const express=require("express")
const path=require("path")
const app=express()



require("./db/connect");
const UserDetail=require("./models/userDetails")
const RegDetail=require("./models/reg")
const { json }=require("express")

const port =process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)

//reg
app.get("/reg", (req, res) => {
    res.render("reg")
})

app.post("/reg", async(req, res) => {
    try{
        
        password = req.body.password;
        confirmpassword = req.body.confirmpassword;
        if (password == confirmpassword) {
          const reg_Detail = new RegDetail({
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            password:password,
            confirmpassword:confirmpassword,
          })
          const reg=await reg_Detail.save()
          res.status(201).render("login")
        }
        else{
            res.send("password not matched")
        }

       
    }
    catch(error){{
        res.status(400).send(error)
    }}
})

//login
app.get("/", (req, res) => {
    res.render("login")
})

app.post("/", async(req, res) => {
    try{
        const username=req.body.username
        const password=req.body.password

        // usermail= await RegisterdUser.findOne({email:email})
        userRecord=await RegDetail.findOne({username:username})
      
        if(userRecord.password==password){
            res.status(201).redirect("/userdetail")
        }
        else{
            res.send("invalid login")
        }
    }
    catch(error){{
        res.status(400).send(error)
    }}
})

//details
app.get("/userdetail", (req, res) => {
    res.render("details")
})

app.post("/userdetail", async(req, res) => {
    try{
        
        const user_Detail=new UserDetail({
            image:req.body.image,
            district:req.body.district,
            thana:req.body.thana,
            flatno:req.body.flatno,
            house_no:req.body.house_no,
            road_no:req.body.road_no,
            alaka:req.body.alaka,
            postcode:req.body.postcode,
            fname:req.body.fname,
            Father_name:req.body.Father_name,
            date_of_birth:req.body.date_of_birth,
            married_status:req.body.married_status,
            Present_address:req.body.Present_address,
            Office_address:req.body.Office_address,
            religion:req.body.religion,
            edu_Qualification:req.body.edu_Qualification,
            mobile_number:req.body.mobile_number,
            email:req.body.email,
            nid_number:req.body.nid_number,
            p_number:req.body.p_number,
            E_name:req.body.E_name,
            relation:req.body.relation,
            e_address:req.body.e_address,
            e_number:req.body.e_number,
            name:req.body.name,
            age:req.body.age,
            occupation:req.body.occupation,
            mobile_number:req.body.mobile_number,
            name1:req.body.name1,
            age1:req.body.age1,
            cupation1:req.body.occupation1,
            mobile_number1:req.body.mobile_number1,
            name2:req.body.name2,
            age2:req.body.age2,
            occupation2:req.body.occupation2,
            mobile_number2:req.body.mobile_number2,
            house_wife:req.body.house_wife,
            housewife_nid_number:req.body.housewife_nid_number,
            housewife_mobile_number:req.body.housewife_mobile_number,
            housewife_Present_address:req.body.housewife_Present_address,
            driver_name:req.body.driver_name,
            driver_nid_number:req.body.driver_nid_number,
            driver_mobile_number:req.body.driver_mobile_number,
            driver_Present_address:req.body.driver_Present_address,
            previous_houseowner_name:req.body.previous_houseowner_name,
            previous_houseowner_mobile_number:req.body.previous_houseowner_mobile_number,
            previous_houseowner_address:req.body.previous_houseowner_address,
            reason_toleave_previous_house:req.body.reason_toleave_previous_house,
            present_houseowner_name:req.body.present_houseowner_name,
            present_houseowner_mobile_number:req.body.present_houseowner_mobile_number,
            timeof_startLiving_in_newhouse:req.body.timeof_startLiving_in_newhouse,
            form_fill_date:req.body.form_fill_date,
            sign_image:req.body.sign_image

        })

        const details=await user_Detail.save()
        res.status(201).render("details")



    }
    catch(error){{
        res.status(400).send(error)
    }}
})



app.listen(port, () => {
    console.log(`${port} running`)
})
