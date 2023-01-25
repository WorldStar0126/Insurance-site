import React, { Fragment, useEffect, useState } from "react";
import {FormGroup, Input } from "reactstrap";
import { Icon, Button } from "../../../components/Component";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";

import { contactPageStatu } from "../../../actions/tutorials";

const DropFiles = (props) => {
  const [files, setFiles] = useState([]);
  const handleDropChange = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  
  const changePage = (index) => {
    props.contactPageStatu(index);
  }

  return (
    <Fragment>
      <h3 className="tab-title">Add/ Modify Contact</h3>
      <div className="contact-content dropFiles-info">
          <FormGroup className="d-flex">
              <label htmlFor="default-4" className="form-label">
              ID Type <span className="red">*</span>
              </label>
              <div className="form-control-wrap">
              <div className="form-control-select">
                  <Input type="select" name="select" id="default-4" placeholder="Select Type">
                  <option value="default_option">Default Option</option>
                  <option value="option_select_name">Option select name</option>
                  <option value="option_select_name">Option select name</option>
                  </Input>
              </div>
              </div>
          </FormGroup>
          <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                  <input {...getInputProps()} />
                  {files.length === 0 && (
                    <div className="dz-message">
                      <span className="dz-upload-icon icon ni ni-upload-cloud"></span>
                      <span className="dz-message-text">Drop files here</span>
                      <span className="dz-message-subtext">Supported formats: PNG, JPG</span>
                      <span className="dz-message-or">OR</span>
                      <Button color="">Browse files</Button>
                    </div>
                  )}
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                    >
                      <div className="dz-image">
                        <img src={file.preview} alt="preview" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </Dropzone>
          <FormGroup>
            <Button
                size="lg"
                className="btn-large btn-upload"
                type="submit"
                color="primary"
            >
                {"Upload"}
            </Button>    
          </FormGroup>  
      </div>
      <div className="drop-info-btngroup d-flex">
        <FormGroup>
          <Button
              size="lg"
              className="btn-large btn-upload"
              type="submit"
              color="primary"
          >
              {"Preview profile"}
          </Button>    
        </FormGroup>  
        <FormGroup>
          <Button
              size="lg"
              className="btn-large btn-upload"
              type="submit"
              color="primary"
          >
              {"Go back"}
          </Button>    
        </FormGroup>
        <FormGroup>
          <Button
              size="lg"
              className="btn-large btn-upload"
              type="submit"
              color="primary"
              onClick={() => changePage(3)}
          >
              {"Save"}
          </Button>    
        </FormGroup>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    contactPage: state.contactPageReducer,
  };
};

export default connect(mapStateToProps,{
  contactPageStatu,
})(DropFiles);

