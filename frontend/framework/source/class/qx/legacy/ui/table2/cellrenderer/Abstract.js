/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)

************************************************************************ */



/**
 * An abstract data cell renderer that does the basic coloring
 * (borders, selected look, ...).
 */
qx.Class.define("qx.legacy.ui.table2.cellrenderer.Abstract",
{
  type : "abstract",
  implement : qx.legacy.ui.table2.ICellRenderer,
  extend : qx.core.Object,

  construct : function() {
    var clazz = this.self(arguments);
    if (!clazz.stylesheet)
    {
      clazz.stylesheet = qx.bom.Stylesheet.createElement(
        ".qooxdoo-table-cell {" +
        " position:absolute;" +
        " top:0px;" +
        " height:100%;" +
        " overflow:hidden;" +
        " white-space:nowrap;" +
        " border-right:1px solid #eeeeee;" +
        " border-bottom:1px solid #eeeeee;" +
        " padding:0px 6px;" +
        " cursor:default;" +

        // (deal text overflow)
        // http://www.css3.info/preview/text-overflow/
        (qx.core.Variant.isSet("qx.client", "mshtml|webkit") ? " text-overflow:ellipsis;" : "") +
        (qx.core.Variant.isSet("qx.client", "opera") ? " -o-text-overflow:ellipsis;" : "") +

        // (avoid text selection)
        // http://www.xulplanet.com/references/elemref/ref_StyleProperties.html
        (qx.core.Variant.isSet("qx.client", "gecko") ? " -moz-user-select:none;" : "") +
        // http://www.colorjack.com/software/dhtml+color+picker.html
        (qx.core.Variant.isSet("qx.client", "khtml") ? " -khtml-user-select:none;" : "") +
        " }" +

        ".qooxdoo-table-cell-right {" +
        "  text-align:right" +
        " }" +
        ".qooxdoo-table-cell-italic {" +
        "  font-style:italic" +
        " }" +
        ".qooxdoo-table-cell-bold {" +
        "  font-weight:bold" +
        " }"
      );
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /**
     * Get a string of the cell element's HTML classes.
     *
     * This method may be overridden by sub classes.
     *
     * @type member
     * @param cellInfo {Map} cellInfo of the cell
     * @return {String} The table cell HTML classes as string.
     */
    _getCellClass : function(cellInfo) {
      return "qooxdoo-table-cell";
    },


    /**
     * Returns the CSS styles that should be applied to the main div of this cell.
     *
     * This method may be overridden by sub classes.
     *
     * @type member
     * @param cellInfo {Map} The information about the cell.
     *          See {@link #createDataCellHtml}.
     * @return {var} the CSS styles of the main div.
     */
    _getCellStyle : function(cellInfo) {
      return cellInfo.style || "";
    },


    /**
     * Returns the HTML that should be used inside the main div of this cell.
     *
     * This method may be overridden by sub classes.
     *
     * @type member
     * @param cellInfo {Map} The information about the cell.
     *          See {@link #createDataCellHtml}.
     * @return {String} the inner HTML of the cell.
     */
    _getContentHtml : function(cellInfo) {
      return cellInfo.value || "";
    },


    // interface implementation
    createDataCellHtml : function(cellInfo, htmlArr)
    {
      htmlArr.push(
        '<div class="',
        this._getCellClass(cellInfo),
        '" style="',
        'left:', cellInfo.styleLeft, 'px;',
        'width:', cellInfo.styleWidth, 'px;',
        this._getCellStyle(cellInfo),
        // deal with unselectable text in Opera 9.2x - not effective in 9.5 beta
        // http://dev.fckeditor.net/ticket/21
        (qx.core.Variant.isSet("qx.client", "opera") ? '" unselectable="on">' : '">'),
        this._getContentHtml(cellInfo),
        '</div>'
      );
    }

  }
});
