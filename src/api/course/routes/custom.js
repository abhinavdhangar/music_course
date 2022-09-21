module.exports= {
    routes:[
        {
            method: 'POST',
            path: '/course/buy',
            handler: 'buy.buy', 
            
          },
          {
            method: 'POST',
            path: '/course/uploadpic',
            handler: 'buy.uploadpic',
          },
          {
            method:"POST",
            path:"/course/ui",
            handler:"buy.ui"
          }
    ]
}