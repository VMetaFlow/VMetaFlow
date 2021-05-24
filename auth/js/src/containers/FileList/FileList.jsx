"use strict";

var React = require('react');
var FileComponent = require('./FileListItem');
module.exports = React.createClass({


    getInitialState: function () {
        return {page: 1};
    },

    onNextPage: function () {
        this.setState({page: this.state.page + 1 < Math.ceil(Object.keys(this.props.files).length / 6) ? this.state.page + 1 : Math.ceil(Object.keys(this.props.files).length / 6)})
    },

    onPreviousPage: function () {
        this.setState({page: this.state.page - 1 > 0 ? this.state.page - 1 : 1})
    },

    onGoToPage: function (page) {
        var self = this;
        return function () {
            self.setState({page: page})
        }
    },

    onClick: function (index) {
        var self = this;
        return function () {
            self.props.onClick(index, self.props.listID)
        }
    },

    render: function () {
        var self = this;
        var fileListContent = (<div className="alert alert-info">
            No files loaded on the server.
        </div>);

        var shouldBeActive = function (value) {
                return self.props.selectedValue === value
            };

        var files = Object.keys(this.props.files);
        if (files.length > 0) {
            var fileComponents = [];
            var fileList = [];
            var pages = [];

            for (var i = 0; i < files.length; i++) {
                fileList.push(
                    <FileComponent onUpdateFileOption={this.props.onUpdateFileOption} file={this.props.files[i]} active={shouldBeActive(this.props.files[i])} onClick={this.onClick(i)}/>
                );

                if ((i + 1) % 6 === 0) {
                    fileComponents.push(<div className="row mb-30 file-grid">{fileList}</div>);
                    fileList = [];
                    pages.push(Math.ceil(i / 6));
                }

            }

            if (files.length < 6 || files.length % 6 > 0) fileComponents.push(<div
                className="row mb-30 file-grid">{fileList}</div>);
            if (files.length % 6 > 0) pages.push(Math.ceil(i / 6));

            fileComponents = [fileComponents[(this.state.page - 1)]];
            var pagination = <div></div>
            if (files.length > 6) {
                pagination = <nav className={"pagination-navbar"}>
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={this.onPreviousPage}>
                                <span>&laquo;</span>
                            </a>
                        </li>
                        {
                            pages.map(function (pageNumber) {
                                var className = pageNumber === self.state.page ? "page-item active" : "page-item";
                                return (
                                    <li className={className}>
                                        <a className="page-link" href="#" onClick={self.onGoToPage(pageNumber)}>{pageNumber}</a>
                                    </li>
                                )
                            })
                        }
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={this.onNextPage}>
                                <span>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            }
            fileListContent = (
                <div className="flex-grow-1 d-flex flex-column">
                    <div className="container-fluid flex-grow-1 d-flex">
                        {fileComponents}
                    </div>
                    {pagination}
                </div>
            )
        }

        return fileListContent

    }
});