import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import { MyPluginSettings, loadSettings, saveSettings } from './MyPluginSettings'
import SchemeHelper from './SchemeHelper'

///////////////

function createObsidianURL(options : {
	action : string,
	parameters : Array<{
		param : string,
		value : string
	}>
}) {



	const action = "open"
      const parameters = [{
        param:`vault`,
        value:`Plugin-Vault`
      }, {
        param:`file`,
        value:`daily-note-template`
      }]
      const parameterString = parameters.reduce((prev,current,i)=>{
        return `${prev}${i==0?"":"&"}${encodeURIComponent(current.param)}=${encodeURIComponent(current.value)}`
      }, '')
      const encoded = `obsidian://${action}?${parameterString}`
			console.log(encoded)
}

export default class ObsidianURLSchemeHelperPlugin extends Plugin {
	settings: MyPluginSettings
	schemeHelper : SchemeHelper

	async onload() {
		await loadSettings(this)
		this.schemeHelper = new SchemeHelper()


		const options = {
			action : "open",
			parameters : [{
        param:`vault`,
        value:`Plugin-Vault`
      }, {
        param:`file`,
        value:`daily-note-template`
      }]
		}
		createObsidianURL(options)

		this.addCommand({
			id: 'open-sample-modal',
			name: 'Open Sample Modal',
			// callback: () => {
			// 	console.log('Simple Callback');
			// },
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new SampleModal(this.app).open();
					}
					return true;
				}
				return false;
			}
		});
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

class SampleSettingTab extends PluginSettingTab {
	plugin: ObsidianURLSchemeHelperPlugin;

	constructor(app: App, plugin: ObsidianURLSchemeHelperPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;
		const { plugin } = this

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					plugin.settings.mySetting = value;
					await saveSettings(plugin);
				}));
	}
}
