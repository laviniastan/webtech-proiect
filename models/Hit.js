module.exports=function(sequelize, Sequelize)
{
    var Hit = sequelize.define('Hits', {
    title: {
        type: Sequelize.STRING,
        field: 'title'
        
    },
      year: {
        type: Sequelize.STRING,
        field: 'year',
        
    }
}, {
    timestamps: false,
    tableName: 'Hits'
});

return Hit;
};
