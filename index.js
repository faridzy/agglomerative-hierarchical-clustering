//memanggil semua class yang mau di gunakan
const express = require('express')
const App = express()
const Axios = require('axios')
const dist = require('./matrixDistance')
const clusterData=require('./hierarchicalClustering')

//Ambil data dari API
App.get('/get-ea-matrix', (req, res) => {
    Axios.get('http://localhost/bismillah/api/get-data')
        .then(result => {
         //mengolah data untuk mengambil nilai kusioner   
        let data= result.data.data
        var currentData=[]
        for (var i=0;i<data.length;i++)
        {
            var tempArray=[]
            tempArray.push(
                parseInt(data[i]['kuisioner1']),
                parseInt(data[i]['kuisioner2']),
                parseInt(data[i]['kuisioner3']),
                parseInt(data[i]['kuisioner4']),
                parseInt(data[i]['kuisioner5']),
                parseInt(data[i]['kuisioner6']),
                parseInt(data[i]['kuisioner7']),
                parseInt(data[i]['kuisioner8']),
                parseInt(data[i]['kuisioner9']),
                parseInt(data[i]['kuisioner10']),
                parseInt(data[i]['kuisioner11']),
                parseInt(data[i]['kuisioner12']),
                parseInt(data[i]['kuisioner13']),
                parseInt(data[i]['kuisioner14']),
                parseInt(data[i]['kuisioner15']),
                parseInt(data[i]['kuisioner16']),
                parseInt(data[i]['kuisioner17']),
                parseInt(data[i]['kuisioner18']),
                parseInt(data[i]['kuisioner19']),
                parseInt(data[i]['kuisioner20']),
                parseInt(data[i]['kuisioner21']),
                parseInt(data[i]['kuisioner22']),
                parseInt(data[i]['kuisioner23']),
                parseInt(data[i]['kuisioner24']),
                parseInt(data[i]['kuisioner25']),
                parseInt(data[i]['kuisioner26']),
                parseInt(data[i]['kuisioner27']),
                parseInt(data[i]['kuisioner28']),
                parseInt(data[i]['kuisioner29']),
                parseInt(data[i]['kuisioner30']),
                parseInt(data[i]['kuisioner31']),
                parseInt(data[i]['kuisioner32']),
                parseInt(data[i]['kuisioner33']),
                parseInt(data[i]['kuisioner34']),
                parseInt(data[i]['kuisioner35']),
                parseInt(data[i]['kuisioner36']),
                parseInt(data[i]['kuisioner37']),
                parseInt(data[i]['kuisioner38']),
                parseInt(data[i]['kuisioner39']),
                parseInt(data[i]['kuisioner40']),
                parseInt(data[i]['kuisioner41']),
                parseInt(data[i]['kuisioner42']),
                parseInt(data[i]['kuisioner43']),
                parseInt(data[i]['kuisioner44']),
                parseInt(data[i]['kuisioner45']),
                parseInt(data[i]['kuisioner46']),
                parseInt(data[i]['kuisioner47']),
                parseInt(data[i]['kuisioner48']),
                parseInt(data[i]['kuisioner49']),        
            );

            currentData.push(tempArray)
        }
        //untuk memanggil function mencari distance
        let distance = dist(currentData)
        //menampillkan data dalam bentuk json response
        res.json(distance)
        }).catch((err) => {
            //jika muncul error
            console.log(Error(err))
            res.send(err)
        })
})

//proses sama dengan api diatasnya,ini membuat API.
App.get('/get-average', (req, res) => {
   Axios.get('http://localhost/bismillah/api/get-data')
        .then(result => {
         //mengolah data untuk mengambil nilai kusioner   
        let data= result.data.data
        var currentData=[]
        for (var i=0;i<data.length;i++)
        {
            var tempArray=[]
            tempArray.push(
                parseInt(data[i]['kuisioner1']),
                parseInt(data[i]['kuisioner2']),
                parseInt(data[i]['kuisioner3']),
                parseInt(data[i]['kuisioner4']),
                parseInt(data[i]['kuisioner5']),
                parseInt(data[i]['kuisioner6']),
                parseInt(data[i]['kuisioner7']),
                parseInt(data[i]['kuisioner8']),
                parseInt(data[i]['kuisioner9']),
                parseInt(data[i]['kuisioner10']),
                parseInt(data[i]['kuisioner11']),
                parseInt(data[i]['kuisioner12']),
                parseInt(data[i]['kuisioner13']),
                parseInt(data[i]['kuisioner14']),
                parseInt(data[i]['kuisioner15']),
                parseInt(data[i]['kuisioner16']),
                parseInt(data[i]['kuisioner17']),
                parseInt(data[i]['kuisioner18']),
                parseInt(data[i]['kuisioner19']),
                parseInt(data[i]['kuisioner20']),
                parseInt(data[i]['kuisioner21']),
                parseInt(data[i]['kuisioner22']),
                parseInt(data[i]['kuisioner23']),
                parseInt(data[i]['kuisioner24']),
                parseInt(data[i]['kuisioner25']),
                parseInt(data[i]['kuisioner26']),
                parseInt(data[i]['kuisioner27']),
                parseInt(data[i]['kuisioner28']),
                parseInt(data[i]['kuisioner29']),
                parseInt(data[i]['kuisioner30']),
                parseInt(data[i]['kuisioner31']),
                parseInt(data[i]['kuisioner32']),
                parseInt(data[i]['kuisioner33']),
                parseInt(data[i]['kuisioner34']),
                parseInt(data[i]['kuisioner35']),
                parseInt(data[i]['kuisioner36']),
                parseInt(data[i]['kuisioner37']),
                parseInt(data[i]['kuisioner38']),
                parseInt(data[i]['kuisioner39']),
                parseInt(data[i]['kuisioner40']),
                parseInt(data[i]['kuisioner41']),
                parseInt(data[i]['kuisioner42']),
                parseInt(data[i]['kuisioner43']),
                parseInt(data[i]['kuisioner44']),
                parseInt(data[i]['kuisioner45']),
                parseInt(data[i]['kuisioner46']),
                parseInt(data[i]['kuisioner47']),
                parseInt(data[i]['kuisioner48']),
                parseInt(data[i]['kuisioner49']),        
            );

            currentData.push(tempArray)
        }

        // Euclidean distance
        function distance(a, b) {
          var d = 0;
          for (var i = 0; i < a.length; i++) {
            d += Math.pow(a[i] - b[i], 2);
          }
          return Math.sqrt(d);
        }
         
        // Single-linkage clustering
        function linkage(distances) {
            var sum = distances.reduce(function (a, b) {
                    return a + b
            })
            return sum / distances.length;
        }
         
        var levels = clusterData({
          input: currentData,
          distance: distance,
          linkage: linkage,
          minClusters: 3, //untuk mengatur cluster yang ingin ditampilkan
        });

        console.log(levels.length);
        var clusters = levels[levels.length - 1].clusters;
        console.log(clusters);
        // // => [ [ 2 ], [ 3, 1, 0 ] ]
        // clusters = clusters.map(function (cluster) {
        //   return cluster.map(function (index) {
        //     return currentData[index];
        //   });
        // });

        console.log(clusters);
        res.json(clusters);
        }).catch((err) => {
          //jika muncul error
          console.log(Error(err))
          res.send(err)
        })
})

App.get('/get-complete', (req, res) => {
   Axios.get('http://localhost/bismillah/api/get-data')
        .then(result => {
         //mengolah data untuk mengambil nilai kusioner   
        let data= result.data.data
        var currentData=[]
        for (var i=0;i<data.length;i++)
        {
            var tempArray=[]
            tempArray.push(
                parseInt(data[i]['kuisioner1']),
                parseInt(data[i]['kuisioner2']),
                parseInt(data[i]['kuisioner3']),
                parseInt(data[i]['kuisioner4']),
                parseInt(data[i]['kuisioner5']),
                parseInt(data[i]['kuisioner6']),
                parseInt(data[i]['kuisioner7']),
                parseInt(data[i]['kuisioner8']),
                parseInt(data[i]['kuisioner9']),
                parseInt(data[i]['kuisioner10']),
                parseInt(data[i]['kuisioner11']),
                parseInt(data[i]['kuisioner12']),
                parseInt(data[i]['kuisioner13']),
                parseInt(data[i]['kuisioner14']),
                parseInt(data[i]['kuisioner15']),
                parseInt(data[i]['kuisioner16']),
                parseInt(data[i]['kuisioner17']),
                parseInt(data[i]['kuisioner18']),
                parseInt(data[i]['kuisioner19']),
                parseInt(data[i]['kuisioner20']),
                parseInt(data[i]['kuisioner21']),
                parseInt(data[i]['kuisioner22']),
                parseInt(data[i]['kuisioner23']),
                parseInt(data[i]['kuisioner24']),
                parseInt(data[i]['kuisioner25']),
                parseInt(data[i]['kuisioner26']),
                parseInt(data[i]['kuisioner27']),
                parseInt(data[i]['kuisioner28']),
                parseInt(data[i]['kuisioner29']),
                parseInt(data[i]['kuisioner30']),
                parseInt(data[i]['kuisioner31']),
                parseInt(data[i]['kuisioner32']),
                parseInt(data[i]['kuisioner33']),
                parseInt(data[i]['kuisioner34']),
                parseInt(data[i]['kuisioner35']),
                parseInt(data[i]['kuisioner36']),
                parseInt(data[i]['kuisioner37']),
                parseInt(data[i]['kuisioner38']),
                parseInt(data[i]['kuisioner39']),
                parseInt(data[i]['kuisioner40']),
                parseInt(data[i]['kuisioner41']),
                parseInt(data[i]['kuisioner42']),
                parseInt(data[i]['kuisioner43']),
                parseInt(data[i]['kuisioner44']),
                parseInt(data[i]['kuisioner45']),
                parseInt(data[i]['kuisioner46']),
                parseInt(data[i]['kuisioner47']),
                parseInt(data[i]['kuisioner48']),
                parseInt(data[i]['kuisioner49']),        
            );

            currentData.push(tempArray)
        }

        // Euclidean distance
        function distance(a, b) {
          var d = 0;
          for (var i = 0; i < a.length; i++) {
            d += Math.pow(a[i] - b[i], 2);
          }
          return Math.sqrt(d);
        }
         
        // Single-linkage clustering
        function linkage(distances) {
          return Math.max.apply(null, distances);
        }
         
        var levels = clusterData({
          input: currentData,
          distance: distance,
          linkage: linkage,
          minClusters: 3, //untuk mengatur cluster yang ingin ditampilkan
        });

        console.log(levels.length);
        var clusters = levels[levels.length - 1].clusters;
        console.log(clusters);
        // // => [ [ 2 ], [ 3, 1, 0 ] ]
        // clusters = clusters.map(function (cluster) {
        //   return cluster.map(function (index) {
        //     return currentData[index];
        //   });
        // });

        console.log(clusters);
        res.json(clusters);
        }).catch((err) => {
          //jika muncul error
          console.log(Error(err))
          res.send(err)
        })
})

App.get('/get-single', (req, res) => {
    Axios.get('http://localhost/bismillah/api/get-data')
        .then(result => {
         //mengolah data untuk mengambil nilai kusioner   
        let data= result.data.data
        var currentData=[]
        for (var i=0;i<data.length;i++)
        {
            var tempArray=[]
            tempArray.push(
                parseInt(data[i]['kuisioner1']),
                parseInt(data[i]['kuisioner2']),
                parseInt(data[i]['kuisioner3']),
                parseInt(data[i]['kuisioner4']),
                parseInt(data[i]['kuisioner5']),
                parseInt(data[i]['kuisioner6']),
                parseInt(data[i]['kuisioner7']),
                parseInt(data[i]['kuisioner8']),
                parseInt(data[i]['kuisioner9']),
                parseInt(data[i]['kuisioner10']),
                parseInt(data[i]['kuisioner11']),
                parseInt(data[i]['kuisioner12']),
                parseInt(data[i]['kuisioner13']),
                parseInt(data[i]['kuisioner14']),
                parseInt(data[i]['kuisioner15']),
                parseInt(data[i]['kuisioner16']),
                parseInt(data[i]['kuisioner17']),
                parseInt(data[i]['kuisioner18']),
                parseInt(data[i]['kuisioner19']),
                parseInt(data[i]['kuisioner20']),
                parseInt(data[i]['kuisioner21']),
                parseInt(data[i]['kuisioner22']),
                parseInt(data[i]['kuisioner23']),
                parseInt(data[i]['kuisioner24']),
                parseInt(data[i]['kuisioner25']),
                parseInt(data[i]['kuisioner26']),
                parseInt(data[i]['kuisioner27']),
                parseInt(data[i]['kuisioner28']),
                parseInt(data[i]['kuisioner29']),
                parseInt(data[i]['kuisioner30']),
                parseInt(data[i]['kuisioner31']),
                parseInt(data[i]['kuisioner32']),
                parseInt(data[i]['kuisioner33']),
                parseInt(data[i]['kuisioner34']),
                parseInt(data[i]['kuisioner35']),
                parseInt(data[i]['kuisioner36']),
                parseInt(data[i]['kuisioner37']),
                parseInt(data[i]['kuisioner38']),
                parseInt(data[i]['kuisioner39']),
                parseInt(data[i]['kuisioner40']),
                parseInt(data[i]['kuisioner41']),
                parseInt(data[i]['kuisioner42']),
                parseInt(data[i]['kuisioner43']),
                parseInt(data[i]['kuisioner44']),
                parseInt(data[i]['kuisioner45']),
                parseInt(data[i]['kuisioner46']),
                parseInt(data[i]['kuisioner47']),
                parseInt(data[i]['kuisioner48']),
                parseInt(data[i]['kuisioner49']),        
            );

            currentData.push(tempArray)
        }

        // Euclidean distance
        function distance(a, b) {
          var d = 0;
          for (var i = 0; i < a.length; i++) {
            d += Math.pow(a[i] - b[i], 2);
          }
          return Math.sqrt(d);
        }
         
        // Single-linkage clustering
        function linkage(distances) {
          return Math.min.apply(null, distances);
        }
         
        var levels = clusterData({
          input: currentData,
          distance: distance,
          linkage: linkage,
          minClusters: 3, //untuk mengatur cluster yang ingin ditampilkan
        });

        console.log(levels.length);
        var clusters = levels[levels.length - 1].clusters;
        console.log(clusters);
        // // => [ [ 2 ], [ 3, 1, 0 ] ]
        // clusters = clusters.map(function (cluster) {
        //   return cluster.map(function (index) {
        //     return currentData[index];
        //   });
        // });

        console.log(clusters);
        res.json(clusters);
        }).catch((err) => {
          //jika muncul error
          console.log(Error(err))
          res.send(err)
        })
})

//menjalankan aplikasi pada port 3100
App.listen(3100, '127.0.0.1', () => {
    console.log('Running');
});