import moment from 'moment'
import { formatTime, timeSelectOptions} from '../helpers/bookingForm'

// Initial worker filter parameters
export const floorParams = [ {name: '8', value: false}, {name: '13', value: false}, {name: 'all', value: false}]

// initial feature filter parameters
export const filterParams = [ 
  {name: 'macLab', value: false},
  {name: 'pcLab', value: false},
  {name: 'tv', value: false},
  {name: 'opWalls', value: false},
  {name: 'projector', value: false} ]

// Initial Capacity parameters
export const capacityParams = [
  {capacity: 16, id: '16seats', value: false},
  {capacity: 18, id: '18seats', value: false},
  {capacity: 20, id: '20seats', value: false},
  {capacity: 24, id: '24seats', value: false},
  {capacity: 40, id: '40seats', value: false},
]

// Filtering Functions

// Filter workerData by floor
export  const onFilterByFloor = (param, filteredData) => {
  if (param === 'all') {
    return filteredData
  } else {
    return filteredData.filter(worker => worker.floor === param)
  }
}

// Filter data by feature
export const onFilterByFeature = (params, filteredData) => {
  params.forEach(feature => {
    if (feature.name === 'macLab' && feature.value === true) {
      filteredData = filteredData.filter(worker => worker.assets.macLab === true)
    } else if (feature.name === 'pcLab' && feature.value === true) {
      filteredData = filteredData.filter(worker => worker.assets.pcLab === true)
    } else if (feature.name === 'tv' && feature.value === true) {
      filteredData = filteredData.filter(worker => worker.assets.tv === true)
    } else if (feature.name === 'opWall' && feature.value === true) {
      filteredData = filteredData.filter(worker => worker.assets.opWalls === true)
    } else if (feature.name === 'projector' && feature.value === true) {
      filteredData = filteredData.filter(worker => worker.assets.projector === true)
    }
  })
  return filteredData
}

// Filter data by capacity
export const onFilterByCapacity = (params, filteredData) => {
  let workersByCapacity = []
  params.forEach(capacity => {
    if (capacity.value === true) {
      workersByCapacity.push(...filteredData.filter(worker => worker.capacity === capacity.capacity))
    }
  })
  if (workersByCapacity.length > 0) {
    return workersByCapacity
  } else {
    return filteredData
  }
}

// Filter data by availability
export const onFilterByAvailablity = (params, filteredData) => {
  if (params === 'fullyAvail') {
    filteredData = filteredData.filter(worker => worker.bookings.length === 0)
  } else if (params === 'partAvail') {
    filteredData = filteredData.filter(worker => worker.bookings.length > 0)
  } else if (params === 'fullBooked') {
    filteredData =
      !filteredData.filter(worker => worker.bookings.length > 0) &&
      !filteredData.filter(worker => worker.bookings.length === 0)
  }
  return filteredData
}
