module.exports = Cluster

Cluster.linkages = {
  'single': singleLink,
  'complete': completeLink,
  'average': averageLink,
}

function Cluster(options) {
  if (!(this instanceof Cluster)) return new Cluster(options)

  if (!Array.isArray(options.input)) throw new TypeError('input must be an array')
  if (!options.input.length) throw new Error('input must not be empty')
  if (typeof options.distance !== 'function') throw new TypeError('invalid distance function')

  if (typeof options.linkage === 'string') options.linkage = Cluster.linkages[options.linkage]

  if (typeof options.linkage !== 'function') throw new TypeError('invalid linkage function')


  this.input = options.input
  this.distance = options.distance
  this.linkage = options.linkage

  this.distances = createDistanceArray(options.input, options.distance)
  this.links = Object.create(null)

  var clusters = this.clusters = []
  for (var i = 0, l = options.input.length; i < l; i++)
    clusters.push([i])

  var level = {
    linkage: null,
    clusters: clusters,
  }
  this.levels = [level]

  var minClusters = Math.max(options.minClusters || 1, 1)
  var maxLinkage = typeof options.maxLinkage === 'number'
    ? options.maxLinkage
    : Infinity

  while (this.clusters.length > minClusters && level.linkage < maxLinkage)
    level = this.reduce()
  return this.levels
}



Cluster.prototype.reduce = function () {
  var clusters = this.clusters
  var min
  for (var i = 0; i < clusters.length; i++) {
    for (var j = 0; j < i; j++) {
      var linkage = this.linkageOf(clusters[i], clusters[j])

      // set the linkage as the min
      if (!min || linkage < min.linkage) {
        min = {
          linkage: linkage,
          i: i,
          j: j,
        }
      }
    }
  }

  clusters = this.clusters = clusters.slice()
  clusters[min.i] = clusters[min.i].concat(clusters[min.j])
  clusters.splice(min.j, 1)
  var level = {
    linkage: min.linkage,
    clusters: clusters,
    from: j,
    to: i,
  }
  this.levels.push(level)
  return level
}


Cluster.prototype.linkageOf = function (clusterA, clusterB) {
  var hash = clusterA.length > clusterB.length
    ? ('' + clusterA + '-' + clusterB)
    : ('' + clusterB + '-' + clusterA)
  var links = this.links
  if (hash in links) return links[hash]

  var distances = [];
  for (var k = 0; k < clusterA.length; k++) {
    for (var h = 0; h < clusterB.length; h++) {
      distances.push(this.distanceOf(clusterA[k], clusterB[h]))
    }
  }


  return links[hash] = this.linkage(distances)
}


Cluster.prototype.distanceOf = function (i, j) {
  if (i > j) return this.distances[i][j]
  return this.distances[j][i]
}

function createDistanceArray(input, distance) {
  var length = input.length
  var matrix = new Array(length)
  for (var i = 0; i < length; i++) {
    matrix[i] = new Array(i)
    for (var j = 0; j < i; j++)
      matrix[i][j] = distance(input[i], input[j])
  }

  return matrix
}
