import React, { Component } from 'react';

import RecordCellDb from '../RecordCellDb';
import FieldSet from './FieldSet';
import Plugin from '../Plugin';


export default class ManuscriptBody extends Component {

  render() {
    const rec = this.props.rec;

    return (
      <div>
        <FieldSet legend="Manuscript identifiers" fields={[
            rec.core.id,
            rec.core.cmclid,
            rec.core.tm,
            rec.core.ldab,
            rec.core.lcbm,
            rec.core.dbmnt,
            rec.core.alias,
            rec.core.issinglefrag,
            rec.core.reusedinbinding,
            rec.core.stratigraphy,
            rec.core.modernhistory,
            rec.core.contents
          ]} />

        { rec.plugins['paths__m_shelfmarks'] && <Plugin data={rec.plugins['paths__m_shelfmarks']} /> }

        <FieldSet legend="Dialects" fields={[
          rec.core.dialect,
          rec.core.dialectnotes
        ]} />

        <FieldSet legend="Dating" fields={[
          rec.core.datingsource,
          rec.core.chronofrom,
          rec.core.chronoto,
          rec.core.datingcriteria
        ]} />

        { rec.plugins['paths__m_msplaces'] && <Plugin data={rec.plugins['paths__m_msplaces']} /> }

        <FieldSet legend="Book form" fields={[
          rec.core.bookform,
          rec.core.writingsupport
        ]} />

        <FieldSet legend="General description" fields={[
          rec.core.leaftotextant,
          rec.core.fragtot,
          rec.core.fragdim,
          rec.core.leaftotestimated,
          rec.core.quiresextant,
          rec.core.gennotes
        ]} />

        <FieldSet legend="Page description" fields={[
          rec.core.columns,
          rec.core.colnotes,
          rec.core.linespercolumn,
          rec.core.charsperline,
          rec.core.alignment,
          rec.core.alignmentnotes
        ]} />

        <FieldSet legend="Dimensions (mm) and proportions" fields={[
          rec.core.leafw,
          rec.core.leafh,
          rec.core.framew,
          rec.core.frameh,
          rec.core.intercolumnium,
          rec.core.marginup,
          rec.core.marginlow,
          rec.core.marginin,
          rec.core.marginout,
          rec.core.marginleft,
          rec.core.marginright,
          rec.core.heighttenlines,
          rec.core.prophw,
          rec.core.propwt,
          rec.core.dimnotes
        ]} />

        { rec.plugins['paths__m_quires'] && <Plugin data={rec.plugins['paths__m_quires']} /> }

        <FieldSet fields={[ rec.core.quirenotes ]} />

        <FieldSet legend="Quire signature" fields={[
          rec.core.quiresig,
          rec.core.quiretype,
          rec.core.quireposition,
          rec.core.quirenrnotes
        ]} />

        <FieldSet legend="Pagination" fields={[
          rec.core.pagination,
          rec.core.pagtype,
          rec.core.pagposition,
          rec.core.pagnote
        ]} />

        <FieldSet legend="Foliation (ancient and modern)" fields={[
          rec.core.foliation,
          rec.core.foltype,
          rec.core.folposition,
          rec.core.folnotes
        ]} />

        <RecordCellDb data={ rec.core.handstot } />

        { rec.plugins['paths__m_hands'] && <Plugin data={rec.plugins['paths__m_hands']} /> }

        <FieldSet legend="Diacritical signs" fields={[
          rec.core.lectionalsigns,
          rec.core.structuralsigns,
          rec.core.signsnotes
        ]} />

        <FieldSet legend="Abbreviations" fields={[
          rec.core.abbreviations,
          rec.core.abbrnotes
        ]} />

        <FieldSet legend="Ruling and pricking" fields={[
          rec.core.ruling,
          rec.core.rulingtype,
          rec.core.rulingtool,
          rec.core.pricking,
          rec.core.rulingnotes
        ]} />

        <FieldSet legend="" fields={[
          rec.core.leaftabs,
          rec.core.leaftabsnotes
        ]} />

        <FieldSet legend="Manufacture of the rolls" fields={[
          rec.core.kolleseis,
          rec.core.kolleseseisdescr,
          rec.core.tracesnotes,
          rec.core.kollno,
          rec.core.kolldim
        ]} />

        <FieldSet legend="Binding" fields={[
          rec.core.bindings,
          rec.core.covers,
          rec.core.coversnotes,
          rec.core.sewings,
          rec.core.sewingtype,
          rec.core.holesno,
          rec.core.holesarrangement,
          rec.core.holesnotes
        ]} />


      <FieldSet legend="Coloured pigments" fields={[
          rec.core.pgmcol,
          rec.core.pgmlocation,
          rec.core.pgmnotes
        ]} />

      <FieldSet legend="Black inks" fields={[
          rec.core.blktype,
          rec.core.blklocation,
          rec.core.blknotes
        ]} />

        <FieldSet legend="Additional information" fields={[
          rec.core.marginalnotes,
          rec.core.greekminuscule,
          rec.core.greekminusculenotes,
          rec.core.palimpsest,
          rec.core.palimpsestnotes,
          rec.core.decortype,
          rec.core.decorsubj,
          rec.core.decorationdescr,
          rec.core.enlargedinitials,
          rec.core.restancient,
          rec.core.restmodern
        ]} />

      { rec.plugins['paths__m_biblio'] && <Plugin data={rec.plugins['paths__m_biblio']} /> }


        <FieldSet legend="Metadata" fields={[
          rec.core.sourceinfo,
          rec.core.editors,
          rec.core.status
        ]} />

      </div>
    );
  }
}
