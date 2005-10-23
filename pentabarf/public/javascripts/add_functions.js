/**
 * create element for dynamic interface 
 *
 * @param type type of the element
 * @param subtype subtype of the element (only needed for type input)
 * @param name name of the element
 * @param values array of values or value
 * @param selected id of the selected element
*/

function create_element(type, subtype, name, values, selected, without_td)
{
  var new_element = document.createElement(type);
  
  if (name != null) {
    new_element.setAttribute("name", name);
    new_element.setAttribute("id", name);
  }

  switch (type) {
    case "a":
      new_element.setAttribute("href", values);
      break;
    case "button":
      new_element.setAttribute("tabindex", 0);
      new_element.setAttribute("type", "button");
      new_element.setAttribute("value", values);
      new_element.setAttribute("onClick", selected);
      new_element.appendChild(document.createTextNode(values));
      break;
    case "img":
      new_element.setAttribute("src", values);
      break;
    case "input":
      new_element.setAttribute("tabindex", 0);
      new_element.setAttribute("type", subtype);
      if (values) new_element.setAttribute("value", values);
      switch (subtype) {
        case "hidden":
          return new_element;
          break;
        case "text":
          if (selected) new_element.setAttribute("size", selected)
          break;
        case "checkbox":
          if (selected == 't') new_element.setAttribute("checked", "checked");
          break;
      }
      break;
    case "select":
      new_element.setAttribute("tabindex", 0);
      for (key in values) {
        if ( key in Object.prototype ) {
          continue;
        }
        var current = document.createElement("option");
        current.setAttribute("value",key);
        if (key == selected) {
          current.setAttribute("selected","selected");
        }
        current.appendChild(document.createTextNode(values[key]));
        new_element.appendChild(current);
      }
      break;
  }
  
  if ( init_done ) {
    enable_save_button();
  }
  if ( without_td != null ) {
    return new_element;
  } else {
    table_cell = document.createElement("td");
    table_cell.appendChild(new_element);
    return table_cell;
  }
}

var conference_track_counter = 0;

function add_conference_track(conference_track_id, tag)
{
  var table_row;
  var row_id = conference_track_counter++;

  document.getElementById('conference_track_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id", "row_" + row_id);

  table_row.appendChild(create_element("input", "hidden", "conference_track[" + row_id + "][conference_track_id]", conference_track_id));
  table_row.appendChild(create_element("input", "text", "conference_track[" + row_id + "][tag]", tag));
  table_row.appendChild(create_element("input", "checkbox", "conference_track[" + row_id + "][delete]"));

  document.getElementById("conference_track_table_body").appendChild(table_row);
  enumerator();
}

var team_counter = 0;

function add_team(team_id, tag)
{
  var table_row;
  var row_id = team_counter++;

  document.getElementById('team_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id", "row_" + row_id);

  table_row.appendChild(create_element("input", "hidden", "team[" + row_id + "][team_id]", team_id));
  table_row.appendChild(create_element("input", "text", "team[" + row_id + "][tag]", tag));
  table_row.appendChild(create_element("input", "checkbox", "team[" + row_id + "][delete]"));

  document.getElementById("team_table_body").appendChild(table_row);
  enumerator();
}

var room_counter = 0;

function add_room(room_id, short_name, f_public, size, remark, rank)
{
  var table_row;
  var row_id = room_counter++;

  document.getElementById('room_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id", "row_" + row_id);

  table_row.appendChild(create_element("input", "hidden", "room[" + row_id + "][room_id]", room_id));
  table_row.appendChild(create_element("input", "text", "room[" + row_id + "][short_name]", short_name));
  table_row.appendChild(create_element("input", "text", "room[" + row_id + "][rank]", rank, 3));
  table_row.appendChild(create_element("input", "checkbox", "room[" + row_id + "][f_public]", 1, f_public));
  table_row.appendChild(create_element("input", "checkbox", "room[" + row_id + "][delete]"));

  document.getElementById("room_table_body").appendChild(table_row);
  enumerator();
}

var person_im_counter = 0;

function add_person_im(person_im_id, im_type_id, im_address)
{
  var table_row;
  var row_id = person_im_counter++;
  
  document.getElementById('im_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  if (person_im_id) {
    element = create_element("a", 0,"person_im["+row_id+"][im_link]", im_scheme[im_type_id]+"://"+im_address, null, true);
    element.setAttribute("title", im_address);
    element.appendChild(create_element("img", 0, "person_im["+row_id+"][image]", p_base + "images/icon-im-32x32.png", null, true));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "person_im["+row_id+"][image]", p_base + "images/icon-im-32x32.png"));
  }
  table_row.appendChild(create_element("input", "hidden", "person_im["+row_id+"][person_im_id]", person_im_id));
  table_row.appendChild(create_element("select", null, "person_im["+row_id+"][im_type_id]", im_type, im_type_id));
  table_row.appendChild(create_element("input", "text", "person_im["+row_id+"][im_address]", im_address, 25));
  table_row.appendChild(create_element("input", "checkbox", "person_im["+row_id+"][delete]"));
  
  document.getElementById("im_table_body").appendChild(table_row);
  enumerator();
}

var person_phone_counter = 0;

function add_person_phone(person_phone_id, phone_type_id, number)
{
  var table_row;
  var row_id = person_phone_counter++;

  document.getElementById('telephone_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  if (person_phone_id) {
    element = create_element("a", 0,"person_phone["+row_id+"][url]", phone_scheme[phone_type_id]+"://"+number, null, true);
    element.setAttribute("title", number);
    element.appendChild(create_element("img", 0, "person_phone["+row_id+"][image]", p_base + "images/icon-phone-32x32.png", null, true));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "person_phone["+row_id+"][image]", p_base + "images/icon-phone-32x32.png"));
  }
  table_row.appendChild(create_element("input", "hidden", "person_phone["+row_id+"][person_phone_id]", person_phone_id));
  table_row.appendChild(create_element("select", 0, "person_phone["+row_id+"][phone_type_id]", phone_type, phone_type_id));
  table_row.appendChild(create_element("input", "text", "person_phone["+row_id+"][phone_number]", number));
  table_row.appendChild(create_element("input", "checkbox", "person_phone["+row_id+"][delete]","1"))
  
  document.getElementById("telephone_table_body").appendChild(table_row);
  enumerator();
}

var link_counter = 0;

function add_link(link_id, url, description)
{
  var table_row, table_data, element;
  var row_id = link_counter++;

  document.getElementById('link_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  if (link_id) {
    element = create_element("a", 0,"link["+row_id+"][url]", url, null, true);
    element.setAttribute("title", url );
    element.appendChild(create_element("img", 0, "link["+row_id+"][image]", p_base + "images/icon-link-32x32.png", null, true));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "link["+row_id+"][image]", p_base + "images/icon-link-32x32.png"));
  }
  table_row.appendChild(create_element("input", "hidden", "link["+row_id+"][link_id]", link_id));
  table_row.appendChild(create_element("input", "text", "link["+row_id+"][url]", url));
  table_row.appendChild(create_element("input", "text", "link["+row_id+"][description]", description));
  table_row.appendChild(create_element("input", "checkbox", "link["+row_id+"][delete]"));
  document.getElementById("link_table_body").appendChild(table_row);
  enumerator();
}

var internal_link_counter = 0;

function add_internal_link(link_id, link_type_id, url, description)
{
  var table_row, table_data, element;
  var row_id = internal_link_counter++;

  document.getElementById('internal_link_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  if (link_id) {
    element = create_element("a", 0,"internal_link["+row_id+"][url]", link_type_prefix[link_type_id] + url, null, true);
    element.setAttribute("title", link_type_prefix[link_type_id] + url );
    element.appendChild(create_element("img", 0, "internal_link["+row_id+"][image]", p_base + "images/icon-link-32x32.png", null, true));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "internal_link["+row_id+"][image]", p_base + "images/icon-link-32x32.png"));
  }
  table_row.appendChild(create_element("input", "hidden", "internal_link["+row_id+"][internal_link_id]", link_id));
  table_row.appendChild(create_element("select", 0, "internal_link["+row_id+"][link_type_id]", link_types, link_type_id));
  table_row.appendChild(create_element("input", "text", "internal_link["+row_id+"][url]", url));
  table_row.appendChild(create_element("input", "text", "internal_link["+row_id+"][description]", description));
  table_row.appendChild(create_element("input", "checkbox", "internal_link["+row_id+"][delete]"));
  document.getElementById("internal_link_table_body").appendChild(table_row);
  enumerator();
}


var person_event_counter = 0;

function add_person_event(event_person_id, event_id, event_role_id, event_role_state_id, remark)
{
  if ( event_names.length == 0 ) {
    alert('You have not yet added events to this conference.');
    return;
  }
  var table_row, table_data, element;
  var row_id = person_event_counter++;

  document.getElementById('person_event_table').style.display = 'block';
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  if (event_id) {
    element = create_element("a", 0, "event_person[" + row_id + "][link]", p_base + "pentabarf/event/" + event_id, null, false );
    element.setAttribute("title", "Go to \""+event_names[event_id]+"\"");
    //element.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "images/icon-event-32x32.png", null, false ));
    element.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "image/event/" + event_id, null, false ));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "images/icon-event-32x32.png"));
  }
  
  table_row.appendChild(create_element("input", "hidden", "event_person["+row_id+"][event_person_id]", event_person_id));

  if (event_id) {
    element = create_element("input", "hidden", "event_person["+row_id+"][event_id]", event_id, null, false);
  } else {
    element = create_element("select", 0, "event_person["+row_id+"][event_id]", event_names, event_id, null, false);
  }

  table_data = document.createElement("td");
  table_data.appendChild(element);
  if (event_id) {
    // include title in <strong> and put subtitle behind <br/>
    strong = document.createElement("strong");
    strong.appendChild( document.createTextNode(event_names[event_id]) );
    table_data.appendChild(strong);

    table_data.appendChild( document.createElement("br") );
    table_data.appendChild( document.createTextNode(event_subtitles[event_id]) );
  }
  table_row.appendChild(table_data);

  var role_select = create_element("select", 0, "event_person["+row_id+"][event_role_id]",event_roles,event_role_id);
  role_select.setAttribute("onchange", "person_event_role_changed('"+row_id+"','"+event_role_state_id+"')");
  table_row.appendChild(role_select);  
  table_row.appendChild(create_element("select", 0, "event_person["+row_id+"][event_role_state_id]",event_role_states[event_role_id],event_role_state_id));
  
  table_row.appendChild(create_element("input", "text", "event_person["+row_id+"][remark]", remark));
  table_row.appendChild(create_element("input", "checkbox", "event_person["+row_id+"][delete]"));
  document.getElementById("person_event_table_body").appendChild(table_row);

  person_event_role_changed(row_id,event_role_state_id);
  enumerator();
}

function person_event_role_changed(row_id,event_role_state_id)
{
  var select_role = document.getElementById("event_person["+row_id+"][event_role_id]");
  var select_state = document.getElementById("event_person["+row_id+"][event_role_state_id]");
  var select_state_new = create_element("select", 0, "event_person["+row_id+"][event_role_state_id]",event_role_states[select_role.value],event_role_state_id);
  
  select_state.parentNode.parentNode.replaceChild(select_state_new, select_state.parentNode);
  
  if ( event_role_states[select_role.value].length > 0 ) {
    select_state_new.firstChild.style.display = "block";
  } else {
    select_state_new.firstChild.style.display = "none";
  }
  enumerator();
}

var event_person_counter = 0;

function add_event_person(event_person_id, person_id, event_role_id, event_role_state_id, remark)
{
  var table_row, table_data, element;
  var row_id = event_person_counter++;

  document.getElementById('persons_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);
  
  if (person_id) {
    element = create_element("a", 0, "event_person[" + row_id + "][link]", p_base + "pentabarf/person/" + person_id, null, false );
    element.setAttribute("title", "Go to \""+person_names[person_id]+"\"");
//    element.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "images/icon-person-32x32.png", null, false ));
    element.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "image/person/" + person_id, null, false));
    table_data = document.createElement("td");
    table_data.appendChild(element);
    table_row.appendChild(table_data);
  } else {
    table_row.appendChild(create_element("img", 0, "event_person["+row_id+"][image]", p_base + "images/icon-person-32x32.png"));
  }

  table_row.appendChild(create_element("input", "hidden", "event_person["+row_id+"][event_person_id]", event_person_id));

  if (person_id) {
    element = create_element("input", "hidden", "event_person["+row_id+"][person_id]", person_id, null, false);
  } else {
    element = create_element("select", 0, "event_person["+row_id+"][person_id]", person_names, person_id, null, false);
  }
  table_data = document.createElement("td");
  table_data.appendChild(element);
  if (person_id) {
    element = document.createTextNode(person_names[person_id]);
    table_data.appendChild(element);
  }
  table_row.appendChild(table_data);


  var role_select = create_element("select", 0, "event_person["+row_id+"][event_role_id]",event_roles,event_role_id);
  role_select.setAttribute("onchange", "event_person_role_changed('"+row_id+"','"+event_role_state_id+"')");
  table_row.appendChild(role_select);
  table_row.appendChild(create_element("select", 0, "event_person["+row_id+"][event_role_state_id]",event_role_states[event_role_id],event_role_state_id));
  
  table_row.appendChild(create_element("input", "text", "event_person["+row_id+"][remark]", remark));
  table_row.appendChild(create_element("input", "checkbox", "event_person["+row_id+"][delete]"));
  document.getElementById("person_table_body").appendChild(table_row);

  event_person_role_changed(row_id,event_role_state_id);
  enumerator();
}


function event_person_role_changed(row_id,event_role_state_id)
{
  var select_role = document.getElementById("event_person["+row_id+"][event_role_id]");
  var select_state = document.getElementById("event_person["+row_id+"][event_role_state_id]");
  var select_state_new = create_element("select", 0, "event_person["+row_id+"][event_role_state_id]",event_role_states[select_role.value],event_role_state_id);
  
  select_state.parentNode.parentNode.replaceChild(select_state_new, select_state.parentNode);
  
  if ( event_role_states[select_role.value].length > 0 ) {
    select_state_new.firstChild.style.display = "block";
  } else {
    select_state_new.firstChild.style.display = "none";
  }
  enumerator();
}

function event_state_changed()
{
  var select_state = document.getElementById("event[event_state_id]");
  var select_progress = document.getElementById("event[event_state_progress_id]");
  var select_progress_new = create_element("select", 0, "event[event_state_progress_id]",event_state_progress[select_state.value]);
  
  select_progress.parentNode.parentNode.replaceChild(select_progress_new, select_progress.parentNode);
  enumerator();
}

var attachment_counter = 0;

function add_attachment()
{
  var table_row;
  var row_id = attachment_counter++;

  document.getElementById('attachment_upload_table').style.display = "block";
  table_row = document.createElement("tr");
  table_row.setAttribute("id","row_"+row_id);

  table_row.appendChild(create_element("select", 0, "attachment_upload["+row_id+"][attachment_type_id]", attachment_types));
  table_row.appendChild(create_element("input", "checkbox", "attachment_upload["+row_id+"][f_public]"));
  table_row.appendChild(create_element("input", "text", "attachment_upload["+row_id+"][title]"));
  table_row.appendChild(create_element("input", "file", "attachment_upload["+row_id+"][data]"));
  document.getElementById("attachment_upload_table_body").appendChild(table_row);

  enumerator();
}

var related_event_counter = 0;

function add_related_event(related_event_id)
{
  var row;
  var row_id = related_event_counter++;

  document.getElementById('related_event_table').style.display = "block";
  
  row = document.createElement("tr");
  row.setAttribute("id","row_"+row_id);
  
  row.appendChild(create_element("select", 0, "related_event["+row_id+"][related_event_id]", event_names, related_event_id));
  row.appendChild(create_element("input", "checkbox", "related_event["+row_id+"][delete]"));
  row.appendChild(create_element("hidden", 0, "").firstChild);
  document.getElementById('related_event_table_body').appendChild(row);
  enumerator();
}

var person_language_counter = 0;

function add_person_language(language_id)
{
  var row;
  var row_id = person_language_counter++;

  document.getElementById('person_language_table').style.display = "block";
  
  row = document.createElement("tr");
  row.setAttribute("id","row_"+row_id);
  
  row.appendChild(create_element("select", 0, "person_language["+row_id+"][language_id]", languages, language_id));
  row.appendChild(create_element("input", "checkbox", "person_language["+row_id+"][delete]"));
  row.appendChild(create_element("hidden", 0, "").firstChild);
  document.getElementById('person_language_table_body').appendChild(row);
  enumerator();
}

var conference_language_counter = 0;

function add_conference_language( language_id )
{
  var row;
  var row_id = conference_language_counter++;

  document.getElementById('conference_language_table').style.display = "block";
  
  row = document.createElement("tr");
  row.setAttribute("id","row_"+row_id);
  
  row.appendChild(create_element("select", 0, "conference_language["+row_id+"][language_id]", languages, language_id));
  row.appendChild(create_element("input", "checkbox", "conference_language["+row_id+"][delete]"));
  row.appendChild(create_element("hidden", 0, "").firstChild);
  document.getElementById('conference_language_table_body').appendChild(row);
  enumerator();
}


