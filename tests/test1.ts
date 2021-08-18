import { mailType, obsidianType, appleMapsType, appleMapsDirectionsType, telephoneType,
  textMessageType, calendarType, } from '../src/DefaultSchemeTypes'
import SchemeHelper from '../src/SchemeHelper'


export default function start() {
  const schemeHelper = new SchemeHelper()

  const allMarkdown = [
    schemeHelper.convertToMarkdown({type:mailType, userInput:{
      to: "kjellconnelly@someone.something",
      subject: "This is a subject",
      body: "My body goes like this!",
    }}),
    schemeHelper.convertToMarkdown({type:obsidianType, text: "Open Plugin-Vault's file: 08-01-2021", userInput:{
      action: "open",
      param1: "vault",
      value1: "Plugin-Vault",
      param2: "file",
      value2: "08-01-2021",
    }}),
    schemeHelper.convertToMarkdown({type:obsidianType, text: "Create new file in Plugin-Vault: Test Note", userInput:{
      action: "new",
      param1: "vault",
      value1: "Plugin-Vault",
      param2: "file",
      value2: "Test Note",
    }}),

    schemeHelper.convertToMarkdown({type:appleMapsType, text: "View White House on Apple Maps", userInput:{
      startAddress: "1600 Pennsylvania Avenue, Washington, D.C., USA",
    }}),
    schemeHelper.convertToMarkdown({type:appleMapsType, text: "Directions to the White House", userInput:{
      startAddress: "here",
      endAddress: "1600 Pennsylvania Avenue, Washington, D.C., USA",
    }}),

    schemeHelper.convertToMarkdown({type:telephoneType, text: "Call us at (817)-569-8900", userInput:{
      number: "+1 (703) 996-2200",
    }}),
    schemeHelper.convertToMarkdown({type:textMessageType, text: "Text Bob", userInput:{
      number: "+1 (703) 996-2200",
      message: "Hey Bob, what's going on?\n\nWanna grab some lunch?"
    }}),
    schemeHelper.convertToMarkdown({type:calendarType, text: "Open Calendar App to December 25, 2021", userInput:{
      date: "December 26, 2021"
    }}),
  ]
  allMarkdown.forEach(md=>console.log(md))
}

console.log(`Starting Tests`)
console.group()
start()
console.groupEnd()
console.log(`Ending Tests`)
