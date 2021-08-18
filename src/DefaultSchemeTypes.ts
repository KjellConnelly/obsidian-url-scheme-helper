import moment from 'moment'
import { URLSchemeType, ParameterType } from './MyTypes'
const chrono = require('chrono-node')

export const mailType : URLSchemeType = {
	name: 'mailto',
  description: 'Mail to ',
	format: 'mailto://{to}?subject={subject}?body={body}',
	parameters: [{
		name:'to',
		type:'string',
    placeholder:'someone@somewhere.com,person2@whatever.org',
		encodeURIComponent: false,
	}, {
		name:'subject',
		type:'string',
	}, {
		name:'body',
		type:'string',
	}]
}

export const obsidianType : URLSchemeType = {
  name: 'Obsidian URI',
  description: `Triggers various actions on the Obsidian app. This scheme is meant for 2 parameters and 2 values. Feel free to copy and modify this to account for other schemes. Not all the placeholders are valid combinations, but they're a good place to get started [Documentation](https://help.obsidian.md/Advanced+topics/Using+obsidian+URI)`,
  format: 'obsidian://{action}?{param1}={value1}&{param2}={value2}',
  parameters: [{
		name:'action',
		type:'string',
    placeholder: 'open | search | new | hook-get-address',
		encodeURIComponent: false,
	}, {
		name:'param1',
		type:'string',
    placeholder: 'vault | file | path || search',
	}, {
		name:'value1',
		type:'string',
    placeholder: '',
	}, {
		name:'param2',
		type:'string',
    placeholder: 'query | file | path | content | silent',
	}, {
		name:'value2',
		type:'string',
    placeholder: '',
	}]
}

export const appleMapsType : URLSchemeType = {
  name: 'Apple Maps',
  description: `Opens Apple Maps app with address. Leave endAddress blank if you don't want directions`,
  format: 'https://maps.apple.com/?{startAddress}{endAddress}',
  parameters: [{
    name : 'startAddress',
    type: 'string',
    placeholder:'here',
    encodeURIComponent: false,
    onFormat:(startAddress:string, parameters:Array<ParameterType>, i:number)=>{
      const parametersWithEndAddress = parameters.filter((param:ParameterType)=>{
        console.log(param)
        return (param.name.endAddress != undefined) && (param.name.endAddress.length != 0)
      })
      console.log(parametersWithEndAddress)
      if (parametersWithEndAddress.length > 0) {
        return `saddr=${encodeURIComponent(startAddress)}`
      } else {
        return `address=${encodeURIComponent(startAddress)}`
      }
    },
  }, {
    name : 'endAddress',
    type: 'string',
    placeholder:'1600 Pennsylvania Avenue, Washington, D.C., USA',
    encodeURIComponent: false,
    optional:true,
    onFormat:(endAddress:string, parameters:Array<ParameterType>, i:number)=>{
      if (endAddress.length > 0) {
        return `&daddr=${encodeURIComponent(endAddress)}`
      } else {
        return ``
      }
    },
  }]
}

/*
export const appleMapsType : URLSchemeType = {
  name: 'Apple Maps Address',
  description: 'Opens Apple Maps app with address.',
  format: 'https://maps.apple.com/?address={address}',
  parameters: [{
    name : 'address',
    type: 'string',
    placeholder:'1600 Pennsylvania Avenue, Washington, D.C., USA',
  }]
}
*/

export const appleMapsDirectionsType : URLSchemeType = {
  name: 'Apple Maps Directions',
  description: `Opens Apple Maps app with directions from one place to another. for "here" to work, you must have location services enabled on your device for the Maps app.`,
  format: 'https://maps.apple.com/?saddr={startAddress}&daddr={endAddress}',
  parameters: [{
    name : 'startAddress',
    type: 'string',
    placeholder:'here',
  }, {
    name : 'endAddress',
    type: 'string',
    placeholder:'1600 Pennsylvania Avenue, Washington, D.C., USA',
  }]
}

export const telephoneType : URLSchemeType = {
  name: 'Telephone Call',
  description: `Prompts user to make a phone call to a specific phone number. Many formats seem to work on iPhone at least.`,
  format: 'tel://{number}',
  parameters: [{
    name : 'number',
    type: 'string',
    placeholder:'703-996-2200',
  }]
}

export const textMessageType : URLSchemeType = {
  name: 'Text Message',
  description: `Opens a new message with an optional message prefilled.`,
  format: 'sms://{number}&body={message}',
  parameters: [{
    name : 'number',
    type: 'string',
    placeholder:'703-996-2200',
  }, {
    name : 'message',
    type: 'string',
    placeholder:'Hi!',
  }]
}

export const calendarType : URLSchemeType = {
  name: 'Open Calendar App to Date',
  description: 'Plugin a date string, and the Calendar App (iOS) will open to that date',
  format: 'calshow:{date}',
  parameters: [{
    name : 'date',
    type: 'string',
    placeholder:'MM-DD-YYYY | tomorrow | december 25, 2021',
    onFormat:(date:string)=>{
      const chronoParsed = chrono.parseDate(date)
      const selectedDate = moment(chronoParsed).toDate().getTime()
      const newestTimestamp = Math.floor(selectedDate / 1000)
      const oldestTimestamp = 978307200
      return newestTimestamp - oldestTimestamp
    },
  }]
}

/* Example for copy and paste
export const _Type : URLSchemeType = {
  name: '',
  description: '',
  format: '',
  parameters: [{
    name : '',
    type: 'string',
    placeholder:'',
    encodeURIComponent: false,
  }, {
    name : '',
    type: 'string',
  }]
}
*/
