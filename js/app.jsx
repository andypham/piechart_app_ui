(function() {
  'use strict';

  var React = require('react');
  var Router = require('director').Router;
  var PieChart = require('react-chartjs').Pie;

  var PieChartApp = React.createClass({

    getInitialState: function() {
      return {
        editing: null,
        editMode: false
      };
    },

    getDataPoint: function(event) {
      var pieChart = this.refs.piechart.getChart();
      var activePoints = pieChart.getSegmentsAtEvent(event);
      console.log(pieChart.segments);
    },

    componentDidMount: function() {
      var setState = this.setState;
      var router = Router({
        '/': setState.bind(this, {editing: null}),
        '/piechart/:id': this.updateShownPieChart,
        '/piechart/:id/edit': this.updateEditMode
      });
      router.init('/');
    },

    onChange: function(event) {
      console.log(event.target.value);
    },

    updateEditMode: function(id) {
      this.setState({
        editing: parseInt(id),
        editMode: true
      });
    },

    updateShownPieChart: function(id) {
      this.setState({
        editing: parseInt(id),
        editMode: false
      });
    },

    render: function() {
      var navbar = (
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Pie Chart App</a>
            </div>
          </div>
        </nav>
      );
      var shownPieChart;

      var pieCharts = this.props.pieCharts.map(function(pieChart, idx) {
        return (
          <li className="list-group-item"
              key={pieChart.id}>
            <a href={'#/piechart/'+pieChart.id}>{pieChart.name}</a>
            <a href={'#/piechart/'+pieChart.id+'/edit'}
               style={editButtonStyle}
               className="btn btn-default"
               role="button">
              edit
            </a>
          </li>
        );
      });

      var selectedPieChart = this.props.pieCharts.filter(function(pieChart) {
        return this.state.editing === pieChart.id
      }.bind(this));

      if (selectedPieChart.length && !this.state.editMode) {
        shownPieChart = (
          <PieChart data={selectedPieChart[0].data}
                    ref="piechart"
                    width="789"
                    height="289"
                    redraw/>
        );
      }
      else if (selectedPieChart.length && this.state.editMode) {
        shownPieChart = (
          <textarea style={textAreaStyle}
                    value={JSON.stringify(selectedPieChart[0].data, null, 4)}
                    onChange={this.onChange} />
        );
      }
      return (
        <div>
          {navbar}
          <div className="container-fluid">
            <div className="row">
              <div className="main">
                {shownPieChart}
                <ul className="list-group">
                  {pieCharts}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

  });
  var data = [
    {
      value: 200,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Red"

    },
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green"

    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow"

    },
    {
      value: 40,
      color: "#949FB1",
      highlight: "#A8B3C5",
      label: "Grey"

    },
    {
      value: 120,
      color: "#4D5360",
      highlight: "#616774",
      label: "Dark Grey"

    }
  ];
  var data2 = [
    {
      value: 120,
      color: "#4D5360",
      highlight: "#616774",
      label: "Dark Grey"

    }
  ];
  var pieCharts = [
    {
      name: 'My Pie Chart',
      id: 1,
      data: data
    },
    {
      name: 'My Second Pie Chart',
      id: 2,
      data: data2
    }
  ]
  var pieStyle = {
    textAlign: "center",
    marginTop: "100px"
  };
  var editButtonStyle = {
    marginLeft: "50px"
  }
  var textAreaStyle = {
    width: "710px",
    height: "215px"
  };
  React.render(
    <div style={pieStyle}>
      <PieChartApp pieCharts={pieCharts}/>
    </div>,
    document.getElementById('piechart-app')
  );
})();
