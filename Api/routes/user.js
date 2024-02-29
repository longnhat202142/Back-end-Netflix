const router = require("express").Router();
const  verify  = require("../verifyToken");
const User = require("../models/user")
const CryptoJS = require("crypto-js")



//Cập nhật
router.put("/:id",verify, async(req,res) =>{

    if (req.user.id === req.params.id   || req.user.isAdmin ) {
        if (req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();

        }

        try {
         const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
         })

         res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("Cập nhật lai tài khoản !!!")
    }
   
})



// Xoá 
router.delete("/:id",verify, async(req,res) =>{

    if (req.user.id === req.params.id  || req.user.isAdmin ) {
    
        try {
         await User.findByIdAndDelete(req.params.id);

         res.status(200).json("Người dùng đã bị xoá !!!");
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("Bạn chỉ có thể xoá tài khoản của mình !!!")
    }
   
})

//Xem thông tin  bản thân
router.get("/find/:id", async(req,res) =>{

        try {
        const user = await User.findById(req.params.id);
         const {...info} =user._doc;   
         res.status(200).json(info);
        } catch (error) {
            res.status(500).json(error)
        }

    }  
)

// Lấy ra tất cả (đối với ai được cấp quyền Admin)
router.get("/",verify, async(req,res) =>{
    const query = req.query.new;
    if ( req.user.isAdmin ) {
    
        try {
  
        const users = query ?  await User.find(req.params.id).limit(5) : await User.find();

         res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("Bạn không được phép xem tất cả người dùng !!!")
    }
   
})

// Thống kê người dùng
router.get("/stats" ,async (req,res) =>{
    const today = new Date();
    const lastYear  = today.setFullYear(today.setFullYear() -1);

    const monthArray = ["Tháng 1",
    "Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7",
    "Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
 // Đếm số bảng ghi của tháng
    try {
        const data = await User.aggregate([
            {
            $project: {
                month :{$month :"$createdAt"}
            },
            },
                {
                $group :{
                    _id : "$month",
                    total :{$sum :1},
                },
            },
        
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router