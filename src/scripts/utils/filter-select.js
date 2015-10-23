var FilterSelect = function(node, sourceData, options){
    // Utility Functions
    var instance = this;
    function createSourceList(data){
        sourceList.innerHTML = '';
        for(var i = 0; !!data && i < data.length; i++){
            var listItem = document.createElement('li');
            listItem.setAttribute('data-index', i);
            if(typeof data[i] === 'object' && !!data[i].name && data[i].value){
                listItem.innerText = data[i].name;
                listItem.setAttribute('data-value', data[i].value);
            }
            else if(typeof data[i] === 'string'){
                listItem.innerText = data[i];
                listItem.setAttribute('data-value', data[i]);
            }
            listItem.addEventListener('click', function onSelect(){
                if(input.value != this.innerText){
                    input.value = this.innerText;
                    input.setAttribute('data-name', this.innerText);
                    input.setAttribute('data-value', this.getAttribute('data-value'));

                    // Bind value to the instance
                    var index = Number(this.getAttribute('data-index'));
                    instance.value = sourceData[index];

                    // Fire the onChange
                    instance.onChange.bind(instance)();
                }
            });
            sourceList.appendChild(listItem);
        }
    }
    function createFilteredList(filter){
        filteredList = [];

        for(var i = 0; !!sourceData && i < sourceData.length; i++){
            var item = sourceData[i];
            var value = (typeof item === 'string') ? item.toLowerCase() : item.name.toLowerCase();
            if(!filter || value.indexOf(filter.toLowerCase()) != -1){    // Then we want it in our filtered list
                filteredList[filteredList.length] = item;
            }
        }
        return filteredList;
    }
    function addClass(node, deltaClass){
        if(!node){
            console.error('ERROR: No node provided. Cannot add class, aborting.');
            return;
        }
        var start = /(\s+|^)/;
        var end = /(\s+|$)/;
        var regExp = (new RegExp(start.source + deltaClass + end.source, 'g'));

        if(!regExp.test(node.className)){
            node.className += ' ' + deltaClass;
        }
    }
    function removeClass(node, deltaClass){
        if(!node){
            console.error('ERROR: No node provided. Cannot add class, aborting.');
            return;
        }
        var start = /(\s+|^)/;
        var end = /(\s+|$)/;
        var regExp = (new RegExp(start.source + deltaClass + end.source, 'g'));
        node.className = node.className.replace(regExp, ' ').trim();
    }
    function hasClass(node, checkClass){
        return !!node && !!node.className && (node.className.split(' ').indexOf(checkClass) != -1)
    }
    // Public functions
    this.onChange = (!!options && options.onChange);

    // Set up the node
    var div = document.createElement('div');
    div.className = 'filterSelect';
    node.appendChild(div);

    // create the down arrow
    var downArrow = document.createElement('div');
    downArrow.className = 'downArrow';
    div.appendChild(downArrow);

    // create the input text
    var input = document.createElement('input');
    input.type = 'text';
    input.addEventListener('keyup', function filterOnKeyUp(){
        createSourceList(createFilteredList(this.value));
    });
    div.appendChild(input);

    // Create the source list
    var sourceList = document.createElement('ul');
    addClass(sourceList, 'hidden');
    createSourceList(sourceData);


    // Code for toggling menu
    window.addEventListener('click', function onClick(e){
        if(e.target != input && e.target != downArrow) {	// If clicked outside
            addClass(sourceList, 'hidden');
            createSourceList(sourceData);	// Back to original list
        }
        else if(e.target == input || e.target == downArrow){	// If inputText clicked, show
            if(hasClass(sourceList, 'hidden')){
                removeClass(sourceList, 'hidden');
            }
            else{
                addClass(sourceList, 'hidden');
            }
        }
    });
    div.appendChild(sourceList);
};