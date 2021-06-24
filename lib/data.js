/*
 * Title: All self made data library (CRUD Operation)
 * Description: File Create,Read and Update
 * Author: Mojahid
 * Date: 12/5/2020
 *
 * @format
 */
/* eslint-env node */
// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
// dir =  In which folder I want to keep
// file = Name of the file
// Data
// Callback, after finishing the task it will give us a callback

lib.create = (dir, file, data, callback) => {
  // open file for writing
  // wx for write something
  // err = Error
  // FileDescriptor if there is no error and it success
  // Wx is moode, Called "Flag"
  fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert data to stirng
      const stringData = JSON.stringify(data);

      // write data to file and then close it
      //  (err2) =>, if there an error it will give us error as callback function
      fs.writeFile(fileDescriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(fileDescriptor, (err3) => {
            if (!err3) {
              callback(false);
            } else {
              callback('Error closing the new file!');
            }
          });
        } else {
          callback('Error writing to new file!');
        }
      });
    } else {
      callback('There was an error, file may already exists!');
    }
  });
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
    callback(err, data);
  });
};

// update existing file
// for updataion we have to read(Open) and write the file

lib.update = (dir, file, data, callback) => {
  // file open for writing (Firt task)
  // r+ this is the mood, Like in c++ to write file 'w' and read file 'r', Here it works in the same way
  fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert the data to string
      const stringData = JSON.stringify(data);

      // truncate the file
      fs.ftruncate(fileDescriptor, (err1) => {
        if (!err1) {
          // write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err2) => {
            if (!err2) {
              // close the file
              fs.close(fileDescriptor, (err3) => {
                if (!err3) {
                  callback(false);
                } else {
                  callback('Error closing file!');
                }
              });
            } else {
              callback('Error writing to file!');
            }
          });
        } else {
          callback('Error truncating file!');
        }
      });
    } else {
      console.log(`Error updating. File may not exist`);
    }
  });
};

// delete existing file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`);
    }
  });
};

// list all the items in a directory
lib.list = (dir, callback) => {
  fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
    if (!err && fileNames && fileNames.length > 0) {
      const trimmedFileNames = [];
      fileNames.forEach((fileName) => {
        trimmedFileNames.push(fileName.replace('.json', ''));
      });
      callback(false, trimmedFileNames);
    } else {
      callback('Error reading directory!');
    }
  });
};

module.exports = lib;
