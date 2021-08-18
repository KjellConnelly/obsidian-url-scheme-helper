import { URLSchemeType } from './MyTypes'

export default class SchemeHelper {
  constructor() {

  }

  public convertToURL(options : {
    title?: string,
  	type: URLSchemeType,
  	userInput: any,
  }) {
    const title = options.title || ""
  	const {type, userInput} = options
  	let s = type.format.trim()

    // convert title
    s = s.replace("{title}", title.trim())

    // convert other parameters
  	type.parameters.forEach((typeParameter, i)=>{
  		const parameterSyntax = "{" + typeParameter.name + "}"
  		const stringHasParameter = s.includes(parameterSyntax)
  		let userInputString = userInput[typeParameter.name]
      if (typeParameter.optional && userInputString == undefined) {
        userInputString = typeParameter.defaultValue || ""
      }
  		const userInputHasParameter = userInputString != undefined
  		if (stringHasParameter && userInputHasParameter) {
  			// only supports strings for user input atm

        // check if there is a callback
        if (typeParameter.onFormat != undefined) {
          userInputString = typeParameter.onFormat(userInputString, userInput, type.parameters, i)
        }

        // encode and replace
  			const encodedOrNot = (typeParameter.encodeURIComponent == false ? userInputString : encodeURIComponent(userInputString))
  			s = s.replace(parameterSyntax, encodedOrNot.trim())
  		}
  	})
  	return s
  }
}
