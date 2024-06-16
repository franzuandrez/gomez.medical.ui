import PropTypes from 'prop-types';
import {
    Page,
    View,
    Text,
    Font,
    Image,
    Document,
    StyleSheet
} from '@react-pdf/renderer';
import {fCurrency} from "../../../../utils/formatNumber";

Font.register({
    family: 'Roboto',
    fonts: [
        {src: '/fonts/Roboto-Regular.ttf'},
        {src: '/fonts/Roboto-Bold.ttf'}
    ]
});

const styles = StyleSheet.create({
    col4: {width: '25%'},
    col8: {width: '75%'},
    col6: {width: '50%'},
    mb8: {marginBottom: 8},
    mb40: {marginBottom: 40},
    overline: {
        fontSize: 8,
        marginBottom: 8,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: 'uppercase'
    },
    h3: {fontSize: 16, fontWeight: 700},
    h4: {fontSize: 13, fontWeight: 700},
    body1: {fontSize: 10},
    subtitle2: {fontSize: 9, fontWeight: 700},
    alignRight: {textAlign: 'right'},
    page: {
        padding: '40px 24px 0 24px',
        fontSize: 9,
        lineHeight: 1.6,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        textTransform: 'capitalize'
    },
    footer: {
        left: 0,
        right: 0,
        bottom: 0,
        padding: 24,
        margin: 'auto',
        borderTopWidth: 1,
        borderStyle: 'solid',
        position: 'absolute',
        borderColor: '#DFE3E8'
    },
    gridContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    table: {display: 'flex', width: 'auto'},
    tableHeader: {},
    tableBody: {},
    tableRow: {
        padding: '8px 0',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DFE3E8'
    },
    noBorder: {paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0},
    tableCell_1: {width: '5%'},
    tableCell_2: {width: '50%', paddingRight: 16},
    tableCell_3: {width: '15%'},
    tableCell_4: {width: '20%'}
});

// ----------------------------------------------------------------------

PurchaseReceivedOrderPDF.propTypes = {
    purchase: PropTypes.object.isRequired
};

export default function PurchaseReceivedOrderPDF({purchase}) {
    const {
        purchase_order_id,
        detail,
        status,
        vendor,
        ship_method,
        total_due
    } = purchase;
    console.log(purchase)
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <Image source='/static/brand/logo_full.jpg' style={{height: 32}}/>
                    <View style={{alignItems: 'right', flexDirection: 'column'}}>
                        <Text style={styles.h3}>{status}</Text>
                        <Text>PED-{purchase_order_id}</Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>

                    <View style={styles.col6}>
                        <Text style={[styles.overline, styles.mb8]}>Proveedor</Text>
                        <Text style={styles.body1}>{vendor.name}</Text>
                        <Text style={styles.body1}>{vendor.url_web}</Text>
                    </View>
                </View>

                <Text style={[styles.overline, styles.mb8]}>Detalle del Pedido</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell_1}>
                                <Text style={styles.subtitle1}>#</Text>
                            </View>
                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Codigo</Text>
                            </View>
                            <View style={styles.tableCell_2}>
                                <Text style={styles.subtitle2}>Descripción</Text>
                            </View>
                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Cantidad</Text>
                            </View>
                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Precio</Text>
                            </View>
                            <View style={styles.tableCell_4}>
                                <Text style={styles.subtitle2}>Total</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tableBody}>
                        {detail.map((item, index) => (
                            <View style={styles.tableRow} key={item.id}>
                                <View style={styles.tableCell_1}>
                                    <Text>{index + 1}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{item.vendor_code  }</Text>
                                </View>
                                <View style={styles.tableCell_2}>
                                    <Text style={styles.subtitle2}>{item.product.name}</Text>
                                    <Text>{item.product.description_formatted.slice(0, 60)}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{item.order_quantity}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{fCurrency(item.unit_price)}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{fCurrency(item.line_total)}</Text>
                                </View>
                            </View>
                        ))}

                    </View>
                    <View style={[styles.tableRow, styles.noBorder]}>
                        <View style={styles.tableCell_1}/>
                        <View style={styles.tableCell_2}/>
                        <View style={styles.tableCell_3}/>
                        <View style={styles.tableCell_3}>
                            <Text>Subtotal</Text>
                        </View>
                        <View style={[styles.tableCell_3, styles.alignRight]}>
                            <Text>{fCurrency(purchase.subtotal)}</Text>
                        </View>
                    </View>

                    <View style={[styles.tableRow, styles.noBorder]}>
                        <View style={styles.tableCell_1}/>
                        <View style={styles.tableCell_2}/>
                        <View style={styles.tableCell_3}/>
                        <View style={styles.tableCell_3}>
                            <Text>Envio</Text>
                            <Text>{ship_method?.name}</Text>
                        </View>
                        <View style={[styles.tableCell_3, styles.alignRight]}>
                            <Text>{fCurrency(purchase.freight)}</Text>
                        </View>
                    </View>

                    <View style={[styles.tableRow, styles.noBorder]}>
                        <View style={styles.tableCell_1}/>
                        <View style={styles.tableCell_2}/>
                        <View style={styles.tableCell_3}/>
                        <View style={styles.tableCell_3}>
                            <Text style={styles.h4}>Total</Text>
                        </View>
                        <View style={[styles.tableCell_3, styles.alignRight]}>
                            <Text style={styles.h4}>{fCurrency(total_due)}</Text>
                        </View>
                    </View>
                </View>


            </Page>
        </Document>
    );
}
