'use strict';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
const LM = Main.layoutManager;

import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class FullscreenAvoiderPreferences extends ExtensionPreferences {
	fillPreferencesWindow(window) {
		let settings = this.getSettings();
		const page = Adw.PreferencesPage.new();

		const settingsGroup = Adw.PreferencesGroup.new();
		settingsGroup.set_title(_("Settings"));

		page.add(settingsGroup);

		settingsGroup.add(buildSwitcher(settings, 'move-hot-corners', _('Move Hot Corners:')));
		settingsGroup.add(buildSwitcher(settings, 'move-notifications', _('Move Notifications:')));

		const monitorsGroup = Adw.PreferencesGroup.new();
		monitorsGroup.set_title(_("Show Top Bar On"));

		page.add(monitorsGroup);
		
		for (const monitor of LM.monitors) {
		    monitorsGroup.add(buildSwitcher(settings, `allow-monitor-${monitor.index}`, _(`Monitor ${monitor.index}:`)));
		}

		window.add(page)
	}
}


function buildSwitcher(settings, key, labeltext) {
	let adwrow = new Adw.ActionRow({
		title: labeltext,
	});
	const switcher = new Gtk.Switch({
		active: settings.get_boolean(key),
		valign: Gtk.Align.CENTER,
	});

	settings.bind(key, switcher, 'active', Gio.SettingsBindFlags.DEFAULT);

	adwrow.add_suffix(switcher);
	adwrow.activatable_widget = switcher;

	return adwrow;
}
