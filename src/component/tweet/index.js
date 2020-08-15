import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newImage: "",
      discription: "",
      tweetList: [],
      newImageError: "",
      discriptionError: "",
    };
  }

  handleCloseModal = () => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: false,
        newImageError: "",
        discriptionError: "",
      });
    }
  };

  isValid = () => {
    const {
      newImage,
      discription,
      newImageError,
      discriptionError,
    } = this.state;
    if (newImage === "") {
      this.setState({
        newImageError: "required",
      });
    }
    if (discription === "") {
      this.setState({
        discriptionError: "required",
      });
    }
    
    if (!!newImageError && !!discriptionError) {
      return false;
    } else {
      return true;
    }
  };

  addNewTweet = () => {
    const { newImage, discription, tweetList } = this.state;
    const isValidTweet = this.isValid();
    if (isValidTweet && newImage && discription) {
      let data = {
        image: newImage,
        tweetDiscription: discription,
      };
      let data1 = tweetList.concat([data]);
      if (!!data1) {
        this.setState({
          tweetList: data1,
          newImage: "",
          discription: "",
        });
      }
      this.handleCloseModal();
    } else {
      return false;
    }
  };

  render() {
    const {
      showModal,
      discriptionError,
      newImageError,
      tweetList,
    } = this.state;
    console.log("---this.state---", tweetList);
    return (
      <Card className="p-5">
        <div style={{ height: "150px" }}>
          <h1 style={{ fontWeight : "bold" }}>Eisha Khan</h1>
          <span>Bio: ReactJS Developer | Engineer</span>
          <Button
            color="primary"
            style={{ float: "right" }}
            onClick={() => this.setState({ showModal: true })}
          >
            Create New Tweet
          </Button>
          <br />
          <span>Email: eishakhan16299@gmail.com</span>
        </div>
        <hr />
        <h3 className="p-3 text-center">
          Recent tweet of Eisha about a topics goes below
        </h3>
        <div>
          {tweetList.length > 0 &&
            tweetList.map((item, index) => (
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <img
                      src={item.image}
                      style={{ height: "200px", width: "200px" }}
                    />
                  </ListItemIcon>
                  <ListItemText className="p-3">
                    {item.tweetDiscription}
                  </ListItemText>
                </ListItem>
              </List>
            ))}
          {tweetList.length === 0 && <span>No Data</span>}
        </div>
        <hr />

        <div>
          <Dialog
            open={showModal}
            onClose={this.handleCloseModal}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle id="customized-dialog-title">
              Add New Tweet
            </DialogTitle>
            <DialogContent dividers>
              <input
                type="file"
                className="form-control mt-2"
                onChange={(event) =>
                  this.setState({
                    newImage: URL.createObjectURL(event.target.files[0]),
                  })
                }
                accept={acceptedFileTypes}
                multiple={false}
              />
              <FormHelperText className={`error-text text-danger`}>
                {newImageError}
              </FormHelperText>
              <TextField
                id="discription"
                label="Discription"
                type="text"
                className="form-control mt-2"
                onChange={(event) =>
                  this.setState({ discription: event.target.value })
                }
              />
              <FormHelperText className={`error-text mt-2 text-danger`}>
                {discriptionError}
              </FormHelperText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button onClick={this.addNewTweet} color="primary">
                Tweet
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default index;
