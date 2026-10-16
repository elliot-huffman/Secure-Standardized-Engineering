// Initialize Tablesort for all tables without a class attribute within articles.
document$.subscribe(function () {
    /** All tables without a class attribute. */
    var tables = document.querySelectorAll("article table:not([class])")

    // Initialize Tablesort for all tables without a class attribute
    tables.forEach(function (table) { new Tablesort(table) })
})
