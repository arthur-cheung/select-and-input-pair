var SelectAndInputPair = function(node, sourceData){
    // Variables
    var model = {name: '', value: ''};

    // Build the thing
    var selectAndInput = document.createElement('div');
    selectAndInput.className = 'selectAndInput';
    node.appendChild(selectAndInput);
    var filterSelect = new FilterSelect(selectAndInput, ['string', {name: 'NVP', value: 'nvp'},{name: 'Another NVP', value: 'another nvp'}, 'another string', 'Yes', 'no']);
    filterSelect.onChange = function(){
        // Check if NVP or string
        var name = (typeof this.value == 'object' && !!this.value.value) ? this.value.value : this.value;
        model.name = name;
    };
    var input = document.createElement('input');
    input.type = 'text';
    input.addEventListener('keyup', function onKeyUp(){
        model.value = this.value;
    });
    selectAndInput.appendChild(input);

    // Public functions
    function getSourceData(){
        return sourceData;
    }
    function setSourceData(deltaSourceData){
        sourceData = deltaSourceData;
    }
    function getModel(){
        return model;
    }

    this.getModel = getModel;
    this.setSourceData = setSourceData;
    this.getSourceData = getSourceData;
};
