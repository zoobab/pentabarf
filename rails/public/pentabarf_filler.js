// javascript, personal default pentabarf 'event' values
//
// Note: change the two last lines accordingly and replace
// "Ferrer" with the room, and "Lightning Talks" with your
// devroom (e.g. "BSD Devroom").

switch_tab('all');
function setListbox(elementid, value, caseSensitive) {
  var oList = document.getElementById(elementid);
  var sTestValue = (caseSensitive ? value : value.toLowerCase());
  var sListValue;
  for (var i = 0; i < oList.options.length; i++) {
    sListValue = (caseSensitive ? oList.options[i].text :
      oList.options[i].text.toLowerCase()); //change text to value if
you wish to compare by value of listbox.
    if (sListValue == sTestValue) {
      oList.selectedIndex = i;
      break;
    }
  }
}
// general
setListbox('event[event_state]', 'accepted', false);
master_change(document.getElementById('event[event_state]'),'event_state_progress');
setListbox('event[event_state_progress]', 'confirmed', false);
// persons
setListbox('event_person[0][event_role]', 'coordinator', false);
table_add_row("event_person");
setListbox('event_person[1][event_role]', 'Speaker', false);
master_change(document.getElementById('event_person[1][event_role]'),'event_role_state');
setListbox('event_person[1][event_role_state]', 'confirmed', false);
// devroom specific
setListbox('event[conference_room_id]', 'Ferrer', true);
setListbox('event[conference_track_id]', 'Lightning Talks', true);

