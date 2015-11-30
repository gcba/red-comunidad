function generarFiltros() {
    var filtroMinis = $("#filtro-ministerio .form-group");
    var filtroMinisHtml = filtroMinis.html();
    var ministerios = $("path.depth1");
    
    var filtroAyuda = $("#filtro-ayuda .form-group");
    var filtroAyudaHtml = filtroAyuda.html();
    var productos = $("path.depth2");

    // Generar Filtros por Ministerio
    for (var i=0; i<ministerios.length; i++) {
        var minisClass = d3.select(ministerios[i]).attr("class").split(" ")[1];
        var minisName = d3.select(ministerios[i])[0][0].__data__.name;
        var checkbox = "<div class='checkbox'><label><input type='checkbox' value='" + 
                       minisClass + 
                       "' name='ministerios'>" + 
                       minisName + "</label></div>";
        filtroMinisHtml += checkbox;
    }
    filtroMinis.html(filtroMinisHtml);

    var tiposAyuda = {};
    // Generar Objeto con todos los tipos de ayuda
    for (var i=0; i<productos.length; i++) {
        var ayudaClass = d3.select(productos[i]).attr("class").split(" ")[1];
        var ayudaName = d3.select(productos[i])[0][0].__data__.tipo_ayuda;
        var inArray = false;
        for (var j=0; j<Object.keys(tiposAyuda).length; j++) {
            if (ayudaClass == Object.keys(tiposAyuda)[j]) { inArray = true; }
        }
        if (!inArray) {
            tiposAyuda[ayudaClass] = ayudaName;
            var checkbox = "<div class='checkbox'><label><input type='checkbox' value='" + 
                           ayudaClass + 
                           "' name='tipo_ayuda'>" + 
                           ayudaName + "</label></div>";
            filtroAyudaHtml += checkbox;
        }
    }
    filtroAyuda.html(filtroAyudaHtml);
}

function filtrarProductos() {
    var ministeriosCh = $("input[name=ministerios]");
    var tiposAyudaCh = $("input[name=tipo_ayuda]");
    
    var mostrarTodosMinis = false, 
        mostrarTodosAyuda = false;

    // Si estan todos destilados, no hay filtro!
    var minisUnchecked = $("input[name=ministerios]:not(:checked)");
    if ( minisUnchecked.length == ministeriosCh.length ) {
        mostrarTodosMinis = true;
    }

    var ayudaUnchecked = $("input[name=tipo_ayuda]:not(:checked)");
    // Si estan todos destildados, mostrarTodos!
    if ( ayudaUnchecked.length == tiposAyudaCh.length ) {
        mostrarTodosAyuda = true;
    }

    // Loopeamos por todos y nos vamos fijando si mostramos o escondemos
    ministeriosCh.each(function() {
        var minisChecked = $(this).prop("checked");
        var minisClass = $(this).val();

        if (mostrarTodosMinis) {
            $("path.depth1, path.depth2").show();
        } else {
            var minisPath = $("path.depth1." + minisClass);
            if (minisChecked) {
                minisPath.show();
                $(getProductos(minisPath[0])).show();
            } else {
                minisPath.hide();
                $(getProductos(minisPath[0])).hide();
            }
        }        
    });

    tiposAyudaCh.each(function() {
        var ayudaChecked = $(this).prop("checked");
        var ayudaVal = $(this).val();

        var ayudaClass = $(this).val();
        
        if (mostrarTodosAyuda) {
            $("path.depth1, path.depth2").show();
        } else {
            var ayudaPath = $("path.depth2." + ayudaClass);
            if (ayudaChecked) {
                ayudaPath.show();
                $(getMinisterios(ayudaPath[0])).show();
            } else {
                ayudaPath.hide();
                $(getMinisterios(ayudaPath[0])).hide();
            }
        }
    });
}