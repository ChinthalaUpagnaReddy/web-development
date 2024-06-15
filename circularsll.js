let nodeCount = 1;

    function addNode(item) {
        if (item == "") {
            item = 'NULL'
        }
        const linkedList = document.getElementById('linked-list');
        const newNode = document.createElement('div');
        newNode.className = 'node';
        newNode.id = 'node' + nodeCount;
        const newNode1 = document.createElement('div');
        newNode1.className = 'arrow';
        newNode1.id = 'arrow' + nodeCount;
        newNode1.innerHTML = ' <img src="rarrow.png" alt="->">'
        newNode.innerHTML = '<div class="leftdata" style=" width: 60%;">'+item+'</div><div class="rightpointer" style=" width: 40%;background-color: red; height:100%; color:white;border-top-right-radius: 5px;border-bottom-right-radius: 5px;">P</div>'
        if (linkedList.innerHTML == "") {
            linkedList.insertBefore(newNode, linkedList.firstChild);
            return;
        }
        linkedList.appendChild(newNode1);
        linkedList.appendChild(newNode);
        
        
        animateNode(newNode);
        
        nodeCount++;
    }
    
    function deleteFront() {
        var linkedList = document.getElementById('linked-list');
        var firstNode = linkedList.firstElementChild;
        if (firstNode !== null) {
            linkedList.removeChild(firstNode);
        }
        linkedList = document.getElementById('linked-list');
        firstNode = linkedList.firstElementChild;
        if (firstNode !== null) {
            linkedList.removeChild(firstNode);
        }
    }
     
    function deleteEnd1() {
        var linkedList = document.getElementById('linked-list');
        var lastNode = linkedList.lastElementChild;
        if (lastNode !== null) {
            linkedList.removeChild(lastNode);
        }
         
    }

    function deleteEnd() {
        var linkedList = document.getElementById('linked-list');
        var lastNode = linkedList.lastElementChild;
        if (lastNode !== null) {
            linkedList.removeChild(lastNode);
        }
         linkedList = document.getElementById('linked-list');
         lastNode = linkedList.lastElementChild;
        if (lastNode !== null) {
            linkedList.removeChild(lastNode);
        }
    }
    
    function animateNode(node) {
        node.style.opacity = 0;
        let opacity = 0;
        const animationInterval = setInterval(function() {
            opacity += 0.1;
            node.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(animationInterval);
            }
        }, 100);
    }
    function insertFront(item) {
        if (item == "") {
            item = 'NULL'
        }
        const linkedList = document.getElementById('linked-list');
        const newNode = document.createElement('div');
        newNode.className = 'node';
        newNode.id = 'node' + nodeCount;
        newNode.innerHTML =  newNode.innerHTML = '<div class="leftdata" style=" width: 60%;">'+item+'</div><div class="rightpointer" style=" width: 40%;background-color: red; height:100%; color:white;border-top-right-radius: 5px;border-bottom-right-radius: 5px;">P</div>'
        const newNode1 = document.createElement('div');
        newNode1.className = 'arrow';
        newNode1.id = 'arrow' + nodeCount;
        newNode1.innerHTML = ' <img src="rarrow.png" alt="->">'
        console.log(linkedList.innerHTML);
        if (linkedList.innerHTML == "") {
            linkedList.insertBefore(newNode, linkedList.firstChild);
            return;
        }
        linkedList.insertBefore(newNode, linkedList.firstChild);
        linkedList.insertBefore(newNode1, linkedList.children[1]);
        animateNode(newNode);
        
        nodeCount++;
    }
    function traverseList() {
        const linkedList1 = document.getElementById('resu');
        let r = "";
        const linkedList = document.getElementById('linked-list');
        let currentNode = linkedList.firstElementChild;
        while (currentNode) {
            const leftDataElement = currentNode.querySelector('.leftdata');
            if (leftDataElement) {
                console.log("Node content:", leftDataElement.innerText);
                r += leftDataElement.innerText.trim() + " <-> ";
            }
            currentNode = currentNode.nextElementSibling;
        }
        console.log("Result:", r);
        linkedList1.innerText = r ? r.substring(0, r.length - 5) : "Empty List";
    }
    
    
    
    function searchElement(value) {
        const linkedList1 = document.getElementById('resu');
        const linkedList = document.getElementById('linked-list');
        let currentNode = linkedList.firstElementChild;
        while (currentNode) {
            const leftDataElement = currentNode.querySelector('.leftdata');
            if (leftDataElement && leftDataElement.innerText.trim() === value.trim()) {
                console.log(`Element ${value} found.`);
                linkedList1.innerText = `Element ${value} found.`;
                return;
            }
            currentNode = currentNode.nextElementSibling;
        }
        console.log(`Element ${value} not found.`);
        linkedList1.innerText = `Element ${value} not found.`;
    }
    
    
    
    