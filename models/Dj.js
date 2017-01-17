module.exports=function (sequelize, Sequelize) {
   var Dj=sequelize.define('Djs',{
          name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        phone: {
            type:Sequelize.STRING,
            field:'phone'
        },
        radio:{
            type:Sequelize.STRING,
            field:'radio'
        }
       
    }, {
        timestamps: false
   });
   return Dj;
};