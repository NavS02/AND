<?php
$route = isset($_POST['route']) ? $_POST['route'] : 'default_route';
$target_dir = "/var/www/html/home/cartografia/public/images/" . $route . "/";

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

$old_dir = $target_dir . "old/";

$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

echo "Request Method: " . $_SERVER['REQUEST_METHOD'];


// Check if image file is a actual image or fake image
if (isset($_FILES["fileToUpload"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check file size (example: limit to 100MB)
    if ($_FILES["fileToUpload"]["size"] > 100000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    $allowedFileTypes = array("jpg", "jpeg", "png", "gif","tif");
    if (!in_array($imageFileType, $allowedFileTypes)) {
        echo "Sorry, only JPG, JPEG, PNG , GIF, TIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        // Create 'old' directory if it doesn't exist
        if (!is_dir($old_dir)) {
            mkdir($old_dir, 0755, true);
        }

        // Move the old file to 'old' directory if it exists
        if (file_exists($target_file)) {
            $old_file = $old_dir . basename($_FILES["fileToUpload"]["name"]);
            $counter = 1;
            // Append a suffix if the file already exists in 'old'
            while (file_exists($old_file)) {
                $old_file = $old_dir . pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_FILENAME) . "_old" . $counter . '.' . $imageFileType;
                $counter++;
            }
            rename($target_file, $old_file);
            echo "Existing file moved to 'old' directory as " . htmlspecialchars(basename($old_file)) . ".";
        }

        // Try to upload the new file
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
