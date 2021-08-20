import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import { MyPluginSettings, loadSettings, saveSettings } from './MyPluginSettings'
import SchemeHelper from './SchemeHelper'
import SettingTab from './SettingTab'
import Commands from './Commands'

export default class ObsidianURLSchemeHelperPlugin extends Plugin {
	settings: MyPluginSettings
	schemeHelper : SchemeHelper
	commands : Commands

	async onload() {
		await loadSettings(this)
		this.schemeHelper = new SchemeHelper()
		this.addSettingTab(new SettingTab(this))
		this.commands = new Commands(this)
	}

	onunload() {

	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}
