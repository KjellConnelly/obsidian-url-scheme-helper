import { mailType, obsidianType, appleMapsType, telephoneType,
  textMessageType, calendarType, iOSShortcutType, youTubeiFrameType} from '../src/DefaultSchemeTypes'
import SchemeHelper from '../src/SchemeHelper'


export default function start() {
  const schemeHelper = new SchemeHelper()

  const allMarkdown = [
    schemeHelper.convertToURL({type:mailType, userInput:{
      to: "kjellconnelly@someone.something",
      subject: "This is a subject",
      body: "My body goes like this!",
    }}),
    schemeHelper.convertToURL({type:obsidianType, title: "Open Plugin-Vault's file: 08-01-2021", userInput:{
      action: "open",
      param1: "vault",
      value1: "Plugin-Vault",
      param2: "file",
      value2: "08-01-2021",
    }}),
    schemeHelper.convertToURL({type:obsidianType, title: "Create new file in Plugin-Vault: Test Note", userInput:{
      action: "new",
      param1: "vault",
      value1: "Plugin-Vault",
      param2: "file",
      value2: "Test Note",
    }}),

    schemeHelper.convertToURL({type:appleMapsType, title: "View White House on Apple Maps", userInput:{
      startAddress: "1600 Pennsylvania Avenue, Washington, D.C., USA",
    }}),
    schemeHelper.convertToURL({type:appleMapsType, title: "Directions to the White House", userInput:{
      startAddress: "here",
      endAddress: "1600 Pennsylvania Avenue, Washington, D.C., USA",
    }}),

    schemeHelper.convertToURL({type:telephoneType, title: "Call us at (817)-569-8900", userInput:{
      number: "+1 (703) 996-2200",
    }}),
    schemeHelper.convertToURL({type:textMessageType, title: "Text Bob", userInput:{
      number: "+1 (703) 996-2200",
      message: "Hey Bob, what's going on?\n\nWanna grab some lunch?"
    }}),
    schemeHelper.convertToURL({type:calendarType, title: "Open Calendar App to December 25, 2021", userInput:{
      date: "December 26, 2021"
    }}),
    schemeHelper.convertToURL({type:iOSShortcutType, title: "Run shortcut: Home ETA", userInput:{
      shortcutName: "Home ETA",

    }}),
    schemeHelper.convertToURL({type:youTubeiFrameType, title: "YouTube Developers Live Video", userInput:{
      videoID: "M7lc1UVf-VE",
      width: "800"
    }}),
  ]
  allMarkdown.forEach(md=>console.log(md))
}

console.log(`Starting Tests`)
console.group()
start()
console.groupEnd()
console.log(`Ending Tests`)
