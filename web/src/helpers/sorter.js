import React from 'react'

export const workerSorter = (workerList, floorNumber) => {
  
  let copiedList = workerList.slice(0)
  
  // filter list of workers to those on the given floor
  let filteredList = copiedList.filter(worker => {
    return worker.floor === floorNumber
  })
  
  // function to sort workers numerically by their floor number
  const numericalSort = workerList => { 
    return workerList.sort((first, second) => {
      const firstWorker = first.name.replace(/\D+/, '')
      const secondWorker = second.name.replace(/\D+/, '')
      if (parseInt(firstWorker, 10) > parseInt(secondWorker, 10)) {
        return 1
      } else {
        return 0
      }
    })
  }
  
  // numerically sort a new array with each worker named 'Worker'
  let nameWorker = numericalSort(
    filteredList.filter(worker => worker.name[0] === 'R')
  )
  
  // numerically sort a new array with each worker named 'Studio'
  let nameStudio = numericalSort(
    filteredList.filter(worker => worker.name[0] === 'S')
  )
  
  // numerically sort a new array with all other named worker types
  let nameOther = numericalSort(
    filteredList.filter(worker => worker.name[0] !== 'S' && worker.name[0] !== 'R')
  )
  
  // re-combine the sorted workers, studios and others into a single array
  return nameWorker.concat(nameStudio).concat(nameOther)
}
