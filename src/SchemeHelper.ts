import { URLSchemeType } from './MyTypes'

export default class SchemeHelper {
  constructor() {

  }

  public convertToMarkdown(options : {
    text? : string,
    type: URLSchemeType,
    userInput: any,
  }) {
    const { text, type, userInput } = options
    const url = this.convertToURL({type, userInput})
    const urlWithMarkdown = this.addMarkdownToLink({text, url})
    return urlWithMarkdown
  }

  private convertToURL(options : {
  	type: URLSchemeType,
  	userInput: any,
  }) {
  	const {type, userInput} = options
  	let s = type.format.trim()
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
          userInputString = typeParameter.onFormat(userInputString, type.parameters, i)
        }

        // encode and replace
  			const encodedOrNot = (typeParameter.encodeURIComponent == false ? userInputString : encodeURIComponent(userInputString))
  			s = s.replace(parameterSyntax, encodedOrNot.trim())
  		}
  	})
  	return s
  }

  private addMarkdownToLink(options : {
    text?: string,
    url:string,
  }) {
    const { text, url } = options
    const newText = text == undefined ? "" : text.trim()
    return `[${newText || ""}](${url})`
  }
}
