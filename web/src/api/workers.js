import React from 'react'
import moment from 'moment'
import api from './init'

export function listWorkers() {
  return api.get('/workers').then(res => res.data)
}
