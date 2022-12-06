var picture_option = document.getElementById("picture");
var video_option = document.getElementById("video");
var real_time_option = document.getElementById("real_time_detect");

function download_ip(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function CheckAbilityAmount() {
    var str = document.getElementsByName("ability");
    count = 0;
    for (i = 0; i < str.length; i++) {
        if (str[i].checked == true)
            count++;
    }
    if (count == 1)
        return true
    else
        return false

}
function getImageName() {
    if (picture_option.checked)
        return "chen0109/picture:latest"
    else if (video_option.checked)
        return "chen0109/video:latest"
    else if (real_time_option.checked)
        return "chen0109/real_time:latest"
}

function WriteBat_Single(text, image_name) {
    text = text + "WshShell.SendKeys \"sudo docker pull " + image_name + "\"\n";

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \"" + document.getElementById("password").value + "\"\n"

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \"sudo docker run\""
    return text;
}

function WriteBat_Mult(text) {
    text = text + "WshShell.SendKeys \"sudo docker-compose up -d\"\n";

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \"" + document.getElementById("password").value + "\"\n"

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n"
    return text;
}

function Connect(text) {
    var name = document.getElementById("device").value;
    var ip = document.getElementById("ip").value;
    text = text + "Dim WshShell\n" + "Set WshShell=WScript.CreateObject(" + "\"WScript.Shell\")\n" + "WshShell.Run \"cmd.exe\"\n"
    if (CheckAbilityAmount() == false) {
        text = text + "WScript.Sleep 1500 \n" + "WshShell.SendKeys "
        text = text + "\"scp docker-compose.yml " + name + "@" + ip + ":/home/" + name + "\"\n";

        text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \""
        text = text + document.getElementById("password").value + "\"\n"
        text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n"
    }
    text = text + "WScript.Sleep 1500 \n" + "WshShell.SendKeys "
    text = text + "\"ssh " + name + "@" + ip + "\"\n";

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \""
    text = text + document.getElementById("password").value + "\"\n"

    text = text + "WshShell.SendKeys \"" + "{ENTER}\"\n" + "WScript.Sleep 1500\n" + "WshShell.SendKeys \"0\"\n" + "WshShell.SendKeys \"" + "{ENTER}\"\n"
    text = text + "WScript.Sleep 1500\n"
    return text;
}

function service_basic_setting(image_tag, volume) {
    var text = "";
    text = text + "    image: " + image_tag + "\n";
    if (volume == true) {
        text = text + "    volumes:\n";
        text = text + "      - .:/source";
    }
    return text;
}

function downloadfile() {
    var text = "";
    var image_name = getImageName()
    text = Connect(text);
    if (CheckAbilityAmount() == true) {
        text = WriteBat_Single(text, image_name);
        download("auto_single.vbs", text);
    }
    else {
        var yaml_text = "";
        yaml_text = yaml_text + "version: \"3.8\"";
        yaml_text = yaml_text + "\n\n";
        yaml_text = yaml_text + "services:\n";
        if (picture_option.checked) {
            var service_text = "";
            yaml_text = yaml_text + "  picture:\n";
            service_text = service_basic_setting("chen0109/picture:latest", true);
            yaml_text = yaml_text + service_text + "\n";
        }
        if (video_option.checked) {
            var service_text = "";
            yaml_text = yaml_text + "  video:\n";
            service_text = service_basic_setting("chen0109/video:latest", true);
            yaml_text = yaml_text + service_text + "\n";
        }
        if (real_time_option.checked) {
            var service_text = "";
            yaml_text = yaml_text + "  real_time:\n";
            service_text = service_basic_setting("chen0109/real_time:latest", false);
            yaml_text = yaml_text + service_text + "\n";
        }
        text = WriteBat_Mult(text);
        download("auto_Mult.vbs", text);
        download("docker-compose.yml", yaml_text);
    }


}
