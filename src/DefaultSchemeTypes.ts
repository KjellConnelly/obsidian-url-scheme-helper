import moment from 'moment'
import { URLSchemeType, ParameterType } from './MyTypes'
//const chrono = require('chrono-node')
import chrono from 'chrono-node'
import getVideoId from 'get-video-id'

export const mailType : URLSchemeType = {
	name: 'Mail To',
  description: 'Sends an email to 1 or many addresses with a subject and body',
	format: '[{title}](mailto://{to}?subject={subject}?body={body})',
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
  format: '[{title}](obsidian://{action}?{param1}={value1}&{param2}={value2})',
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
  format: '[{title}](https://maps.apple.com/?{startAddress}{endAddress})',
  parameters: [{
    name : 'startAddress',
    type: 'string',
    placeholder:'here',
    encodeURIComponent: false,
    onFormat:(startAddress:string, userInput:any, parameters:Array<ParameterType>, i:number)=>{
      return `${userInput.endAddress ? "saddr" : "address"}=${encodeURIComponent(startAddress)}`
    },
  }, {
    name : 'endAddress',
    type: 'string',
    placeholder:'1600 Pennsylvania Avenue, Washington, D.C., USA',
    encodeURIComponent: false,
    optional:true,
    onFormat:(endAddress:string)=>{
      return endAddress ? `&daddr=${encodeURIComponent(endAddress)}` : ""
    },
  }]
}

export const telephoneType : URLSchemeType = {
  name: 'Telephone Call',
  description: `Prompts user to make a phone call to a specific phone number. Many formats seem to work on iPhone at least.`,
  format: '[{title}](tel://{number})',
  parameters: [{
    name : 'number',
    type: 'string',
    placeholder:'703-996-2200',
  }]
}

export const textMessageType : URLSchemeType = {
  name: 'Text Message',
  description: `Opens a new message with an optional message prefilled.`,
  format: '[{title}](sms://{number}&body={message})',
  parameters: [{
    name : 'number',
    type: 'string',
    placeholder:'703-996-2200',
  }, {
    name: 'message',
    type: 'string',
    placeholder:'Hi!',
  }]
}

export const calendarType : URLSchemeType = {
  name: 'Open Calendar App to Date',
  description: 'Plugin a date string, and the Calendar App (iOS) will open to that date',
  format: '[{title}](calshow:{date})',
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

export const iOSShortcutType : URLSchemeType = {
  name: 'Run iOS Shortcut',
  description: `Runs a shortcut in iOS`,
  format: '[{title}](shortcuts://run-shortcut?name={shortcutName}{input}',
  parameters: [{
    name : 'shortcutName',
    type: 'string',
    placeholder:'Home ETA',
  }, {
    name: 'input',
    type: 'string',
    placeholder:'"clipboard" | string',
		optional:true,
		defaultValue:"",
		encodeURIComponent: false,
		onFormat:(inputString: string)=>{
			if (inputString.length == 0) return '';
			const prefix = "&input="
			const suffix = (inputString.trim().toLowerCase() == "clipboard") ?
				"clipboard" :
				`text&text=${encodeURIComponent(inputString)}`
			return prefix + suffix
		},
  }]
}

export const youTubeiFrameType : URLSchemeType = {
  name: 'YouTube Video',
  description: 'Embed YouTube video with an iFrame.',
  format: `<iframe src="https://www.youtube.com/embed/{videoID}?{srcParams}" {width}{height}{iframeParams}></iframe>`,
  parameters: [{
    name : 'videoID',
    type: 'string',
    placeholder:'https://www.youtube.com/watch?v=M7lc1UVf-VE | M7lc1UVf-VE',
    encodeURIComponent: false,
		onFormat:((videoID:string)=>{
			return getVideoId(videoID).id || videoID
		})
  }, {
    name : 'width',
    type: 'string',
		optional: true,
		placeholder: '640 | 100%',
		encodeURIComponent:false,
		onFormat:((width:string)=>{
			return width.length > 0 ? `width="${width}" ` : ''
		})
  }, {
    name : 'height',
    type: 'string',
		optional: true,
		placeholder: '360 | 100%',
		encodeURIComponent:false,
		onFormat:((height:string)=>{
			return height.length > 0 ? `height="${height}" ` : ''
		})
  }, {
    name : 'srcParams',
    type: 'string',
		optional: true,
		placeholder: 'autoplay=1 | autoplay=0&playsinline=1 | whatever',
		encodeURIComponent:false,
  }, {
    name : 'iframeParams',
    type: 'string',
		optional: true,
		placeholder: '',
		encodeURIComponent:false,
  },
]}

export const allDefaultSchemeTypes : Array<URLSchemeType> = [
	mailType,
	obsidianType,
	appleMapsType,
	telephoneType,
	textMessageType,
	calendarType,
	iOSShortcutType,
	youTubeiFrameType,
]
/*

*/



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
