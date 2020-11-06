var rightconnection=false;
var datapoints1 = [];
jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
               
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
         endpoint = {
            anchor: [-1, 0, 0, -1],
            connectorStyle: { strokeWidth: 7, stroke: "rgba(255,0,0,0.7)" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 1,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);

            return instance.addEndpoint(elId, endpoint);
        },

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 200;
            var x = (5 * w) + Math.floor(Math.random() * (10 * w));
            var y = (5 * h) + Math.floor(Math.random() * (10 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "littledot.png" } ],
        Connector: [ "Bezier", { curviness: -90 } ],
        Container: "canvas"
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("ld1"),
            e2 = prepare("ld2"),
            
            e4 = prepare("ld4"),
            e5 = prepare("ld5"),
            
            clearBtn = jsPlumb.getSelector("#anim-clear"),
            addBtn = jsPlumb.getSelector("#add");

         var detachLinks = jsPlumb.getSelector(".littledot .detach");
            instance.on(detachLinks, "click", function (e) {
                instance.deleteConnectionsForElement(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            instance.on(document.getElementById("clear"), "click", function (e) {
                instance.detachEveryConnection();
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
            });


        
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);


document.getElementById("check11").addEventListener("click", function () {
  
        var correct_connections_1_4 = [
            {
                "source": "ld1",
                "target": "ld4"
            },

            {
                "source": "ld4",
                "target": "ld1"
            }
        ];

        var correct_connections_2_5 = [
            {
                "source": "ld2",
                "target": "ld5"
            },
    
            {
                "source": "ld5",
                "target": "ld2"
            }
        ];
        


        var allowed_connections = [
            {
                "source": "ld1",
                "target": "ld4"
            },

            {
                "source": "ld4",
                "target": "ld1"
            },
            {
                "source": "ld2",
                "target": "ld5"
            },
    
            {
                "source": "ld5",
                "target": "ld2"
            },
           
            
         ];
         var actual_connections = instance.getAllConnections();

        var is_connected_1_4= false;
        var is_connected_2_5 = false;
        

        var unallowed_connection_present = false;

        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_1_4){
                is_connected_1_4 = correct_connections_1_4.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

           if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                }));
            }

        });
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_2_5){
                is_connected_2_5 = correct_connections_2_5.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

           if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                }));
            }

        });
        
            

     

        if ( is_connected_1_4&&is_connected_2_5 && !unallowed_connection_present && $("#drag1").parents("#div1").length == 1 && $("#drag2").parents("#div2").length == 1
        && $("#drag3").parents("#div3").length == 1 && $("#drag6").parents("#div6").length == 1 && $("#drag10").parents("#div10").length == 1 && $("#drag11").parents("#div11").length == 1 && $("#drag0").parents("#div0").length == 1) {
        
            alert("CORRECT CONNECTION");
            
            document.getElementById("name").style.visibility = "visible";
         document.getElementById("cch").disabled= false;
         document.getElementById("next1").disabled= true;
         document.getElementById('beam').innerText= localStorage.getItem("Beam")
  document.getElementById('reflector').innerText= localStorage.getItem("V1")
         document.getElementById("check").disabled= true;
            document.getElementById("images").style.visibility= "hidden";
            document.getElementById("images").style.display= "none";
            document.getElementById("images2").style.visibility= "hidden";
            document.getElementById("images2").style.display= "none";
            document.getElementById("images1").style.visibility= "visible";
            document.getElementById("images2").style.opacity= "0";
            document.getElementById("images").style.opacity= "0";
            document.getElementById("images1").style.opacity= "1";
            document.getElementById("images1").style.display= "block";
            
            rightconnection=true;
            
            return;
            }
            else if(!is_connected_1_4&& !is_connected_2_5 ){
            alert("Complete the connections")
            return
            }
        
            else {
               alert("WRONG CONNECTION");
                return;
            }
         
    }
   );
  
} 
);
