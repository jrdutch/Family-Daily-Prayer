/**
 * Catholic Daily Prayer — Home Assistant Custom Card
 *
 * Drop into config/www/catholic-daily-card.js, then add to resources:
 *   url: /local/catholic-daily-card.js
 *   type: module
 *
 * Card YAML:
 *   type: custom:catholic-daily-card
 */

// ─── Lectionary Data ────────────────────────────────────────────────────────

const SUNDAY_READINGS = {
  A: {
    advent: [
      { first: 'Is 2:1-5',        psalm: 'Ps 122',     second: 'Rom 13:11-14',           gospel: 'Mt 24:37-44'           },
      { first: 'Is 11:1-10',      psalm: 'Ps 72',      second: 'Rom 15:4-9',             gospel: 'Mt 3:1-12'             },
      { first: 'Is 35:1-6a, 10',  psalm: 'Ps 146',     second: 'Jas 5:7-10',             gospel: 'Mt 11:2-11'            },
      { first: 'Is 7:10-14',      psalm: 'Ps 24',      second: 'Rom 1:1-7',              gospel: 'Mt 1:18-24'            },
    ],
    christmas: [
      { label: 'Holy Family',     first: 'Sir 3:2-6, 12-14',   psalm: 'Ps 128',   second: 'Col 3:12-21',          gospel: 'Mt 2:13-15, 19-23'     },
      { label: 'Epiphany',        first: 'Is 60:1-6',           psalm: 'Ps 72',    second: 'Eph 3:2-3a, 5-6',     gospel: 'Mt 2:1-12'             },
      { label: 'Baptism of Lord', first: 'Is 42:1-4, 6-7',     psalm: 'Ps 29',    second: 'Acts 10:34-38',        gospel: 'Mt 3:13-17'            },
    ],
    lent: [
      { first: 'Gen 2:7-9; 3:1-7',          psalm: 'Ps 51',      second: 'Rom 5:12-19',         gospel: 'Mt 4:1-11'              },
      { first: 'Gen 12:1-4a',               psalm: 'Ps 33',      second: '2 Tm 1:8b-10',        gospel: 'Mt 17:1-9'              },
      { first: 'Ex 17:3-7',                 psalm: 'Ps 95',      second: 'Rom 5:1-2, 5-8',      gospel: 'Jn 4:5-42'              },
      { first: '1 Sam 16:1b, 6-7, 10-13a', psalm: 'Ps 23',      second: 'Eph 5:8-14',          gospel: 'Jn 9:1-41'              },
      { first: 'Ez 37:12-14',               psalm: 'Ps 130',     second: 'Rom 8:8-11',          gospel: 'Jn 11:1-45'             },
      { label: 'Palm Sunday',
        first: 'Is 50:4-7',                 psalm: 'Ps 22',      second: 'Phil 2:6-11',         gospel: 'Mt 26:14—27:66'         },
    ],
    easter: [
      { first: 'Acts 10:34a, 37-43',   psalm: 'Ps 118',   second: 'Col 3:1-4',            gospel: 'Jn 20:1-9'              },
      { first: 'Acts 2:42-47',         psalm: 'Ps 118',   second: '1 Pt 1:3-9',           gospel: 'Jn 20:19-31'            },
      { first: 'Acts 2:14, 22-33',     psalm: 'Ps 16',    second: '1 Pt 1:17-21',         gospel: 'Lk 24:13-35'            },
      { first: 'Acts 2:14a, 36-41',    psalm: 'Ps 23',    second: '1 Pt 2:20b-25',        gospel: 'Jn 10:1-10'             },
      { first: 'Acts 6:1-7',           psalm: 'Ps 33',    second: '1 Pt 2:4-9',           gospel: 'Jn 14:1-12'             },
      { first: 'Acts 8:5-8, 14-17',    psalm: 'Ps 66',    second: '1 Pt 3:15-18',         gospel: 'Jn 14:15-21'            },
      { label: 'Ascension',
        first: 'Acts 1:1-11',          psalm: 'Ps 47',    second: 'Eph 1:17-23',          gospel: 'Mt 28:16-20'            },
      { first: 'Acts 1:12-14',         psalm: 'Ps 27',    second: '1 Pt 4:13-16',         gospel: 'Jn 17:1-11a'           },
      { label: 'Pentecost',
        first: 'Acts 2:1-11',          psalm: 'Ps 104',   second: '1 Cor 12:3b-7, 12-13', gospel: 'Jn 20:19-23'           },
    ],
    ordinary: [
      null, // 1 (no Sunday 1 in OT; taken by Baptism of Lord)
      { first: 'Is 49:3, 5-6',              psalm: 'Ps 40',   second: '1 Cor 1:1-3',          gospel: 'Jn 1:29-34'    },
      { first: 'Is 8:23—9:3',              psalm: 'Ps 27',   second: '1 Cor 1:10-13, 17',    gospel: 'Mt 4:12-23'    },
      { first: 'Zep 2:3; 3:12-13',         psalm: 'Ps 146',  second: '1 Cor 1:26-31',         gospel: 'Mt 5:1-12a'    },
      { first: 'Is 58:7-10',               psalm: 'Ps 112',  second: '1 Cor 2:1-5',           gospel: 'Mt 5:13-16'    },
      { first: 'Sir 15:15-20',             psalm: 'Ps 119',  second: '1 Cor 2:6-10',          gospel: 'Mt 5:17-37'    },
      { first: 'Lv 19:1-2, 17-18',         psalm: 'Ps 103',  second: '1 Cor 3:16-23',         gospel: 'Mt 5:38-48'    },
      { first: 'Is 49:14-15',              psalm: 'Ps 62',   second: '1 Cor 4:1-5',           gospel: 'Mt 6:24-34'    },
      { first: 'Dt 11:18, 26-28, 32',      psalm: 'Ps 31',   second: 'Rom 3:21-25, 28',       gospel: 'Mt 7:21-27'    },
      { first: 'Hos 6:3-6',               psalm: 'Ps 50',   second: 'Rom 4:18-25',           gospel: 'Mt 9:9-13'     },
      { first: 'Ex 19:2-6a',              psalm: 'Ps 100',  second: 'Rom 5:6-11',            gospel: 'Mt 9:36—10:8'  },
      { first: 'Jer 20:10-13',            psalm: 'Ps 69',   second: 'Rom 5:12-15',           gospel: 'Mt 10:26-33'   },
      { first: '2 Kgs 4:8-11, 14-16a',    psalm: 'Ps 89',   second: 'Rom 6:3-4, 8-11',       gospel: 'Mt 10:37-42'   },
      { first: 'Zec 9:9-10',              psalm: 'Ps 145',  second: 'Rom 8:9, 11-13',        gospel: 'Mt 11:25-30'   },
      { first: 'Is 55:10-11',             psalm: 'Ps 65',   second: 'Rom 8:18-23',           gospel: 'Mt 13:1-23'    },
      { first: 'Wis 12:13, 16-19',        psalm: 'Ps 86',   second: 'Rom 8:26-27',           gospel: 'Mt 13:24-43'   },
      { first: '1 Kgs 3:5, 7-12',         psalm: 'Ps 119',  second: 'Rom 8:28-30',           gospel: 'Mt 13:44-52'   },
      { first: 'Is 55:1-3',               psalm: 'Ps 145',  second: 'Rom 8:35, 37-39',       gospel: 'Mt 14:13-21'   },
      { first: '1 Kgs 19:9a, 11-13a',     psalm: 'Ps 85',   second: 'Rom 9:1-5',             gospel: 'Mt 14:22-33'   },
      { first: 'Is 56:1, 6-7',            psalm: 'Ps 67',   second: 'Rom 11:13-15, 29-32',   gospel: 'Mt 15:21-28'   },
      { first: 'Is 22:19-23',             psalm: 'Ps 138',  second: 'Rom 11:33-36',          gospel: 'Mt 16:13-20'   },
      { first: 'Jer 20:7-9',              psalm: 'Ps 63',   second: 'Rom 12:1-2',            gospel: 'Mt 16:21-27'   },
      { first: 'Ez 33:7-9',               psalm: 'Ps 95',   second: 'Rom 13:8-10',           gospel: 'Mt 18:15-20'   },
      { first: 'Sir 27:30—28:7',          psalm: 'Ps 103',  second: 'Rom 14:7-9',            gospel: 'Mt 18:21-35'   },
      { first: 'Is 55:6-9',               psalm: 'Ps 145',  second: 'Phil 1:20c-24, 27a',    gospel: 'Mt 20:1-16a'   },
      { first: 'Ez 18:25-28',             psalm: 'Ps 25',   second: 'Phil 2:1-11',           gospel: 'Mt 21:28-32'   },
      { first: 'Is 5:1-7',                psalm: 'Ps 80',   second: 'Phil 4:6-9',            gospel: 'Mt 21:33-43'   },
      { first: 'Is 25:6-10a',             psalm: 'Ps 23',   second: 'Phil 4:12-14, 19-20',   gospel: 'Mt 22:1-14'    },
      { first: 'Is 45:1, 4-6',            psalm: 'Ps 96',   second: '1 Thes 1:1-5b',         gospel: 'Mt 22:15-21'   },
      { first: 'Ex 22:20-26',             psalm: 'Ps 18',   second: '1 Thes 1:5c-10',        gospel: 'Mt 22:34-40'   },
      { first: 'Mal 1:14b—2:2b, 8-10',   psalm: 'Ps 131',  second: '1 Thes 2:7b-9, 13',     gospel: 'Mt 23:1-12'    },
      { first: 'Wis 6:12-16',             psalm: 'Ps 63',   second: '1 Thes 4:13-18',        gospel: 'Mt 25:1-13'    },
      { first: 'Prv 31:10-13, 19-20, 30-31', psalm: 'Ps 128', second: '1 Thes 5:1-6',       gospel: 'Mt 25:14-30'   },
      { label: 'Our Lord Jesus Christ, King of the Universe',
        first: 'Ez 34:11-12, 15-17',      psalm: 'Ps 23',   second: '1 Cor 15:20-26, 28',    gospel: 'Mt 25:31-46'   },
    ],
  },

  B: {
    advent: [
      { first: 'Is 63:16b-17, 19b; 64:2-7', psalm: 'Ps 80',  second: '1 Cor 1:3-9',          gospel: 'Mk 13:33-37'   },
      { first: 'Is 40:1-5, 9-11',            psalm: 'Ps 85',  second: '2 Pt 3:8-14',          gospel: 'Mk 1:1-8'      },
      { first: 'Is 61:1-2a, 10-11',          psalm: 'Lk 1:46-50, 53-54', second: '1 Thes 5:16-24', gospel: 'Jn 1:6-8, 19-28' },
      { first: '2 Sam 7:1-5, 8b-12, 14a, 16', psalm: 'Ps 89', second: 'Rom 16:25-27',         gospel: 'Lk 1:26-38'    },
    ],
    christmas: [
      { label: 'Holy Family',     first: 'Gen 15:1-6; 21:1-3',  psalm: 'Ps 105',  second: 'Heb 11:8, 11-12, 17-19', gospel: 'Lk 2:22-40'    },
      { label: 'Epiphany',        first: 'Is 60:1-6',            psalm: 'Ps 72',   second: 'Eph 3:2-3a, 5-6',         gospel: 'Mt 2:1-12'     },
      { label: 'Baptism of Lord', first: 'Is 55:1-11',           psalm: 'Is 12',   second: 'Acts 10:34-38',            gospel: 'Mk 1:7-11'     },
    ],
    lent: [
      { first: 'Gen 9:8-15',              psalm: 'Ps 25',  second: '1 Pt 3:18-22',   gospel: 'Mk 1:12-15'  },
      { first: 'Gen 22:1-2, 9a, 10-13, 15-18', psalm: 'Ps 116', second: 'Rom 8:31b-34', gospel: 'Mk 9:2-10' },
      { first: 'Ex 20:1-17',              psalm: 'Ps 19',  second: '1 Cor 1:22-25',  gospel: 'Jn 2:13-25'  },
      { first: '2 Chr 36:14-16, 19-23',   psalm: 'Ps 137', second: 'Eph 2:4-10',     gospel: 'Jn 3:14-21'  },
      { first: 'Jer 31:31-34',            psalm: 'Ps 51',  second: 'Heb 5:7-9',      gospel: 'Jn 12:20-33' },
      { label: 'Palm Sunday',
        first: 'Is 50:4-7',               psalm: 'Ps 22',  second: 'Phil 2:6-11',    gospel: 'Mk 14:1—15:47' },
    ],
    easter: [
      { first: 'Acts 10:34a, 37-43',   psalm: 'Ps 118',  second: 'Col 3:1-4',             gospel: 'Jn 20:1-9'     },
      { first: 'Acts 4:32-35',         psalm: 'Ps 118',  second: '1 Jn 5:1-6',            gospel: 'Jn 20:19-31'   },
      { first: 'Acts 3:13-15, 17-19',  psalm: 'Ps 4',    second: '1 Jn 2:1-5a',           gospel: 'Lk 24:35-48'   },
      { first: 'Acts 4:8-12',          psalm: 'Ps 118',  second: '1 Jn 3:1-2',            gospel: 'Jn 10:11-18'   },
      { first: 'Acts 9:26-31',         psalm: 'Ps 22',   second: '1 Jn 3:18-24',          gospel: 'Jn 15:1-8'     },
      { first: 'Acts 10:25-26, 34-35, 44-48', psalm: 'Ps 98', second: '1 Jn 4:7-10',     gospel: 'Jn 15:9-17'    },
      { label: 'Ascension',
        first: 'Acts 1:1-11',          psalm: 'Ps 47',   second: 'Eph 1:17-23',           gospel: 'Mk 16:15-20'   },
      { first: 'Acts 1:15-17, 20a, 20c-26', psalm: 'Ps 103', second: '1 Jn 4:11-16',     gospel: 'Jn 17:11b-19'  },
      { label: 'Pentecost',
        first: 'Acts 2:1-11',          psalm: 'Ps 104',  second: '1 Cor 12:3b-7, 12-13',  gospel: 'Jn 20:19-23'   },
    ],
    ordinary: [
      null,
      { first: '1 Sam 3:3b-10, 19',         psalm: 'Ps 40',  second: '1 Cor 6:13c-15a, 17-20', gospel: 'Jn 1:35-42'   },
      { first: 'Jon 3:1-5, 10',             psalm: 'Ps 25',  second: '1 Cor 7:29-31',           gospel: 'Mk 1:14-20'   },
      { first: 'Dt 18:15-20',              psalm: 'Ps 95',  second: '1 Cor 7:32-35',           gospel: 'Mk 1:21-28'   },
      { first: 'Jb 7:1-4, 6-7',            psalm: 'Ps 147', second: '1 Cor 9:16-19, 22-23',    gospel: 'Mk 1:29-39'   },
      { first: 'Lv 13:1-2, 44-46',         psalm: 'Ps 32',  second: '1 Cor 10:31—11:1',        gospel: 'Mk 1:40-45'   },
      { first: 'Is 43:18-19, 21-22, 24b-25', psalm: 'Ps 41', second: '2 Cor 1:18-22',          gospel: 'Mk 2:1-12'    },
      { first: 'Hos 2:16b, 17b, 21-22',    psalm: 'Ps 103', second: '2 Cor 3:1b-6',            gospel: 'Mk 2:18-22'   },
      { first: 'Dt 5:12-15',               psalm: 'Ps 81',  second: '2 Cor 4:6-11',            gospel: 'Mk 2:23—3:6'  },
      { first: 'Gen 3:9-15',               psalm: 'Ps 130', second: '2 Cor 4:13—5:1',          gospel: 'Mk 3:20-35'   },
      { first: 'Ez 17:22-24',              psalm: 'Ps 92',  second: '2 Cor 5:6-10',            gospel: 'Mk 4:26-34'   },
      { first: 'Jb 38:1, 8-11',            psalm: 'Ps 107', second: '2 Cor 5:14-17',           gospel: 'Mk 4:35-41'   },
      { first: 'Wis 1:13-15; 2:23-24',     psalm: 'Ps 30',  second: '2 Cor 8:7, 9, 13-15',    gospel: 'Mk 5:21-43'   },
      { first: 'Ez 2:2-5',                 psalm: 'Ps 123', second: '2 Cor 12:7-10',           gospel: 'Mk 6:1-6'     },
      { first: 'Am 7:12-15',               psalm: 'Ps 85',  second: 'Eph 1:3-14',             gospel: 'Mk 6:7-13'    },
      { first: 'Jer 23:1-6',               psalm: 'Ps 23',  second: 'Eph 2:13-18',            gospel: 'Mk 6:30-34'   },
      { first: '2 Kgs 4:42-44',            psalm: 'Ps 145', second: 'Eph 4:1-6',              gospel: 'Jn 6:1-15'    },
      { first: 'Ex 16:2-4, 12-15',         psalm: 'Ps 78',  second: 'Eph 4:17, 20-24',        gospel: 'Jn 6:24-35'   },
      { first: '1 Kgs 19:4-8',             psalm: 'Ps 34',  second: 'Eph 4:30—5:2',           gospel: 'Jn 6:41-51'   },
      { first: 'Prv 9:1-6',                psalm: 'Ps 34',  second: 'Eph 5:15-20',            gospel: 'Jn 6:51-58'   },
      { first: 'Jos 24:1-2a, 15-17, 18b',  psalm: 'Ps 34',  second: 'Eph 5:21-32',            gospel: 'Jn 6:60-69'   },
      { first: 'Dt 4:1-2, 6-8',            psalm: 'Ps 15',  second: 'Jas 1:17-18, 21b-22, 27', gospel: 'Mk 7:1-8, 14-15, 21-23' },
      { first: 'Is 35:4-7a',               psalm: 'Ps 146', second: 'Jas 2:1-5',              gospel: 'Mk 7:31-37'   },
      { first: 'Is 50:5-9a',               psalm: 'Ps 116', second: 'Jas 2:14-18',            gospel: 'Mk 8:27-35'   },
      { first: 'Wis 2:12, 17-20',          psalm: 'Ps 54',  second: 'Jas 3:16—4:3',           gospel: 'Mk 9:30-37'   },
      { first: 'Nm 11:25-29',              psalm: 'Ps 19',  second: 'Jas 5:1-6',              gospel: 'Mk 9:38-43, 45, 47-48' },
      { first: 'Gen 2:18-24',              psalm: 'Ps 128', second: 'Heb 2:9-11',             gospel: 'Mk 10:2-16'   },
      { first: 'Wis 7:7-11',               psalm: 'Ps 90',  second: 'Heb 4:12-13',            gospel: 'Mk 10:17-30'  },
      { first: 'Is 53:10-11',              psalm: 'Ps 33',  second: 'Heb 4:14-16',            gospel: 'Mk 10:35-45'  },
      { first: 'Jer 31:7-9',               psalm: 'Ps 126', second: 'Heb 5:1-6',              gospel: 'Mk 10:46-52'  },
      { first: 'Dt 6:2-6',                 psalm: 'Ps 18',  second: 'Heb 7:23-28',            gospel: 'Mk 12:28b-34' },
      { first: '1 Kgs 17:10-16',           psalm: 'Ps 146', second: 'Heb 9:24-28',            gospel: 'Mk 12:38-44'  },
      { first: 'Dn 12:1-3',                psalm: 'Ps 16',  second: 'Heb 10:11-14, 18',       gospel: 'Mk 13:24-32'  },
      { label: 'Our Lord Jesus Christ, King of the Universe',
        first: 'Dn 7:13-14',               psalm: 'Ps 93',  second: 'Rev 1:5-8',              gospel: 'Jn 18:33b-37' },
    ],
  },

  C: {
    advent: [
      { first: 'Jer 33:14-16',    psalm: 'Ps 25',   second: '1 Thes 3:12—4:2',  gospel: 'Lk 21:25-28, 34-36' },
      { first: 'Bar 5:1-9',       psalm: 'Ps 126',  second: 'Phil 1:4-6, 8-11', gospel: 'Lk 3:1-6'           },
      { first: 'Zep 3:14-18a',    psalm: 'Is 12',   second: 'Phil 4:4-7',       gospel: 'Lk 3:10-18'          },
      { first: 'Mi 5:1-4a',       psalm: 'Ps 80',   second: 'Heb 10:5-10',      gospel: 'Lk 1:39-45'          },
    ],
    christmas: [
      { label: 'Holy Family',     first: '1 Sam 1:20-22, 24-28',  psalm: 'Ps 84',  second: '1 Jn 3:1-2, 21-24',   gospel: 'Lk 2:41-52'   },
      { label: 'Epiphany',        first: 'Is 60:1-6',              psalm: 'Ps 72',  second: 'Eph 3:2-3a, 5-6',      gospel: 'Mt 2:1-12'     },
      { label: 'Baptism of Lord', first: 'Is 40:1-5, 9-11',        psalm: 'Ps 104', second: 'Ti 2:11-14; 3:4-7',    gospel: 'Lk 3:15-16, 21-22' },
    ],
    lent: [
      { first: 'Dt 26:4-10',          psalm: 'Ps 91',  second: 'Rom 10:8-13',     gospel: 'Lk 4:1-13'        },
      { first: 'Gen 15:5-12, 17-18',  psalm: 'Ps 27',  second: 'Phil 3:17—4:1',   gospel: 'Lk 9:28b-36'      },
      { first: 'Ex 3:1-8a, 13-15',    psalm: 'Ps 103', second: '1 Cor 10:1-6, 10-12', gospel: 'Lk 13:1-9'    },
      { first: 'Jos 5:9a, 10-12',     psalm: 'Ps 34',  second: '2 Cor 5:17-21',   gospel: 'Lk 15:1-3, 11-32' },
      { first: 'Is 43:16-21',         psalm: 'Ps 126', second: 'Phil 3:8-14',      gospel: 'Jn 8:1-11'        },
      { label: 'Palm Sunday',
        first: 'Is 50:4-7',           psalm: 'Ps 22',  second: 'Phil 2:6-11',      gospel: 'Lk 22:14—23:56'   },
    ],
    easter: [
      { first: 'Acts 10:34a, 37-43',   psalm: 'Ps 118',  second: 'Col 3:1-4',            gospel: 'Jn 20:1-9'     },
      { first: 'Acts 5:12-16',         psalm: 'Ps 118',  second: 'Rev 1:9-11a, 12-13, 17-19', gospel: 'Jn 20:19-31' },
      { first: 'Acts 5:27-32, 40b-41', psalm: 'Ps 30',   second: 'Rev 5:11-14',          gospel: 'Jn 21:1-19'    },
      { first: 'Acts 13:14, 43-52',    psalm: 'Ps 100',  second: 'Rev 7:9, 14b-17',       gospel: 'Jn 10:27-30'   },
      { first: 'Acts 14:21-27',        psalm: 'Ps 145',  second: 'Rev 21:1-5a',           gospel: 'Jn 13:31-33a, 34-35' },
      { first: 'Acts 15:1-2, 22-29',   psalm: 'Ps 67',   second: 'Rev 21:10-14, 22-23',   gospel: 'Jn 14:23-29'   },
      { label: 'Ascension',
        first: 'Acts 1:1-11',          psalm: 'Ps 47',   second: 'Eph 1:17-23',           gospel: 'Lk 24:46-53'   },
      { first: 'Acts 7:55-60',         psalm: 'Ps 97',   second: 'Rev 22:12-14, 16-17, 20', gospel: 'Jn 17:20-26' },
      { label: 'Pentecost',
        first: 'Acts 2:1-11',          psalm: 'Ps 104',  second: '1 Cor 12:3b-7, 12-13',  gospel: 'Jn 20:19-23'   },
    ],
    ordinary: [
      null,
      { first: 'Is 62:1-5',                  psalm: 'Ps 96',  second: '1 Cor 12:4-11',       gospel: 'Jn 2:1-11'    },
      { first: 'Neh 8:2-4a, 5-6, 8-10',      psalm: 'Ps 19',  second: '1 Cor 12:12-30',      gospel: 'Lk 1:1-4; 4:14-21' },
      { first: 'Jer 1:4-5, 17-19',           psalm: 'Ps 71',  second: '1 Cor 12:31—13:13',   gospel: 'Lk 4:21-30'   },
      { first: 'Is 6:1-2a, 3-8',             psalm: 'Ps 138', second: '1 Cor 15:1-11',        gospel: 'Lk 5:1-11'    },
      { first: 'Jer 17:5-8',                 psalm: 'Ps 1',   second: '1 Cor 15:12, 16-20',   gospel: 'Lk 6:17, 20-26' },
      { first: '1 Sam 26:2, 7-9, 12-13, 22-23', psalm: 'Ps 103', second: '1 Cor 15:45-49',   gospel: 'Lk 6:27-38'   },
      { first: 'Sir 27:4-7',                 psalm: 'Ps 92',  second: '1 Cor 15:54-58',       gospel: 'Lk 6:39-45'   },
      { first: '1 Kgs 8:41-43',              psalm: 'Ps 117', second: 'Gal 1:1-2, 6-10',      gospel: 'Lk 7:1-10'    },
      { first: '1 Kgs 17:17-24',             psalm: 'Ps 30',  second: 'Gal 1:11-19',          gospel: 'Lk 7:11-17'   },
      { first: '2 Sam 12:7-10, 13',          psalm: 'Ps 32',  second: 'Gal 2:16, 19-21',      gospel: 'Lk 7:36—8:3'  },
      { first: 'Zec 12:10-11; 13:1',         psalm: 'Ps 63',  second: 'Gal 3:26-29',          gospel: 'Lk 9:18-24'   },
      { first: '1 Kgs 19:16b, 19-21',        psalm: 'Ps 16',  second: 'Gal 5:1, 13-18',       gospel: 'Lk 9:51-62'   },
      { first: 'Is 66:10-14c',               psalm: 'Ps 66',  second: 'Gal 6:14-18',          gospel: 'Lk 10:1-12, 17-20' },
      { first: 'Dt 30:10-14',                psalm: 'Ps 69',  second: 'Col 1:15-20',           gospel: 'Lk 10:25-37'  },
      { first: 'Gen 18:1-10a',               psalm: 'Ps 15',  second: 'Col 1:24-28',           gospel: 'Lk 10:38-42'  },
      { first: 'Gen 18:20-32',               psalm: 'Ps 138', second: 'Col 2:12-14',           gospel: 'Lk 11:1-13'   },
      { first: 'Eccl 1:2; 2:21-23',          psalm: 'Ps 90',  second: 'Col 3:1-5, 9-11',       gospel: 'Lk 12:13-21'  },
      { first: 'Wis 18:6-9',                 psalm: 'Ps 33',  second: 'Heb 11:1-2, 8-19',      gospel: 'Lk 12:32-48'  },
      { first: 'Jer 38:4-6, 8-10',           psalm: 'Ps 40',  second: 'Heb 12:1-4',            gospel: 'Lk 12:49-53'  },
      { first: 'Is 66:18-21',                psalm: 'Ps 117', second: 'Heb 12:5-7, 11-13',     gospel: 'Lk 13:22-30'  },
      { first: 'Sir 3:17-18, 20, 28-29',     psalm: 'Ps 68',  second: 'Heb 12:18-19, 22-24a', gospel: 'Lk 14:1, 7-14' },
      { first: 'Wis 9:13-18b',               psalm: 'Ps 90',  second: 'Phlm 9-10, 12-17',      gospel: 'Lk 14:25-33'  },
      { first: 'Ex 32:7-11, 13-14',          psalm: 'Ps 51',  second: '1 Tm 1:12-17',          gospel: 'Lk 15:1-32'   },
      { first: 'Am 8:4-7',                   psalm: 'Ps 113', second: '1 Tm 2:1-8',             gospel: 'Lk 16:1-13'   },
      { first: 'Am 6:1a, 4-7',               psalm: 'Ps 146', second: '1 Tm 6:11-16',           gospel: 'Lk 16:19-31'  },
      { first: 'Hb 1:2-3; 2:2-4',            psalm: 'Ps 95',  second: '2 Tm 1:6-8, 13-14',     gospel: 'Lk 17:5-10'   },
      { first: '2 Kgs 5:14-17',              psalm: 'Ps 98',  second: '2 Tm 2:8-13',            gospel: 'Lk 17:11-19'  },
      { first: 'Ex 17:8-13',                 psalm: 'Ps 121', second: '2 Tm 3:14—4:2',          gospel: 'Lk 18:1-8'    },
      { first: 'Sir 35:12-14, 16-18',        psalm: 'Ps 34',  second: '2 Tm 4:6-8, 16-18',     gospel: 'Lk 18:9-14'   },
      { first: 'Wis 11:22—12:2',             psalm: 'Ps 145', second: '2 Thes 1:11—2:2',        gospel: 'Lk 19:1-10'   },
      { first: '2 Mc 7:1-2, 9-14',           psalm: 'Ps 17',  second: '2 Thes 2:16—3:5',        gospel: 'Lk 20:27-38'  },
      { first: 'Mal 3:19-20a',               psalm: 'Ps 98',  second: '2 Thes 3:7-12',          gospel: 'Lk 21:5-19'   },
      { label: 'Our Lord Jesus Christ, King of the Universe',
        first: '2 Sam 5:1-3',                psalm: 'Ps 122', second: 'Col 1:12-20',            gospel: 'Lk 23:35-43'  },
    ],
  },
};

// Special solemnities that always override Sunday readings
const FIXED_FEASTS = {
  '01-01': { label: 'Solemnity of Mary, Mother of God', first: 'Nm 6:22-27', psalm: 'Ps 67', second: 'Gal 4:4-7', gospel: 'Lk 2:16-21' },
  '08-15': { label: 'Assumption of the Blessed Virgin Mary', first: 'Rev 11:19a; 12:1-6a, 10ab', psalm: 'Ps 45', second: '1 Cor 15:20-27', gospel: 'Lk 1:39-56' },
  '11-01': { label: 'All Saints', first: 'Rev 7:2-4, 9-14', psalm: 'Ps 24', second: '1 Jn 3:1-3', gospel: 'Mt 5:1-12a' },
  '12-08': { label: 'Immaculate Conception of the Blessed Virgin Mary', first: 'Gen 3:9-15, 20', psalm: 'Ps 98', second: 'Eph 1:3-6, 11-12', gospel: 'Lk 1:26-38' },
  '12-25': { label: 'Nativity of the Lord (Christmas)', first: 'Is 52:7-10', psalm: 'Ps 98', second: 'Heb 1:1-6', gospel: 'Jn 1:1-18' },
};

// ─── Traditional Prayers for Children ───────────────────────────────────────

const KIDS_PRAYERS = [
  {
    name: 'Hail Mary',
    language: 'English',
    text: `Hail Mary, full of grace,\nthe Lord is with thee.\nBlessed art thou among women,\nand blessed is the fruit\nof thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\nAmen.`,
  },
  {
    name: 'Our Father',
    language: 'English',
    text: `Our Father, who art in heaven,\nhallowed be Thy name;\nThy kingdom come;\nThy will be done on earth as it is in heaven.\nGive us this day our daily bread;\nand forgive us our trespasses\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil.\nAmen.`,
  },
  {
    name: 'Glory Be',
    language: 'English',
    text: `Glory be to the Father,\nand to the Son,\nand to the Holy Spirit.\nAs it was in the beginning,\nis now, and ever shall be,\nworld without end.\nAmen.`,
  },
  {
    name: 'Guardian Angel Prayer',
    language: 'English',
    text: `Angel of God,\nmy guardian dear,\nto whom God's love\ncommits me here,\never this day\nbe at my side,\nto light and guard,\nto rule and guide.\nAmen.`,
  },
  {
    name: 'Ave Maria',
    language: 'Latin',
    text: `Ave Maria, gratia plena,\nDominus tecum.\nBenedicta tu in mulieribus,\net benedictus fructus ventris tui, Iesus.\nSancta Maria, Mater Dei,\nora pro nobis peccatoribus,\nnunc et in hora mortis nostrae.\nAmen.`,
  },
  {
    name: 'Pater Noster',
    language: 'Latin',
    text: `Pater noster, qui es in caelis:\nsanctificetur Nomen Tuum;\nadveniat Regnum Tuum;\nfiat voluntas Tua,\nsicut in caelo, et in terra.\nPanem nostrum cotidianum da nobis hodie;\net dimitte nobis debita nostra,\nsicut et nos dimittimus debitoribus nostris;\net ne nos inducas in tentationem;\nsed libera nos a Malo.\nAmen.`,
  },
  {
    name: 'Memorare',
    language: 'English',
    text: `Remember, O most gracious Virgin Mary,\nthat never was it known\nthat anyone who fled to thy protection,\nimplored thy help,\nor sought thy intercession,\nwas left unaided.\nInspired with this confidence,\nI fly to thee, O Virgin of virgins, my Mother.\nTo thee I come, before thee I stand,\nsinful and sorrowful.\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in thy mercy hear and answer me.\nAmen.`,
  },
  {
    name: 'Act of Contrition',
    language: 'English',
    text: `O my God,\nI am heartily sorry for having offended Thee,\nand I detest all my sins\nbecause I dread the loss of Heaven\nand the pains of Hell,\nbut most of all because they offend Thee, my God,\nwho art all good\nand deserving of all my love.\nI firmly resolve,\nwith the help of Thy grace,\nto confess my sins, to do penance,\nand to amend my life.\nAmen.`,
  },
  {
    name: 'Morning Offering',
    language: 'English',
    text: `O Jesus, through the Immaculate Heart of Mary,\nI offer You my prayers, works,\njoys, and sufferings of this day\nfor all the intentions of Your Sacred Heart,\nin union with the Holy Sacrifice of the Mass\nthroughout the world,\nin reparation for my sins,\nfor the intentions of all our associates,\nand in particular for the intentions\nof the Holy Father.\nAmen.`,
  },
  {
    name: 'Grace Before Meals',
    language: 'English',
    text: `Bless us, O Lord,\nand these Thy gifts,\nwhich we are about to receive\nfrom Thy bounty,\nthrough Christ our Lord.\nAmen.`,
  },
  {
    name: 'Grace After Meals',
    language: 'English',
    text: `We give Thee thanks for all Thy benefits,\nO Almighty God, who livest and reignest forever;\nand may the souls of the faithful departed,\nthrough the mercy of God,\nrest in peace.\nAmen.`,
  },
  {
    name: 'Hail Holy Queen (Salve Regina)',
    language: 'English',
    text: `Hail, Holy Queen, Mother of Mercy,\nour life, our sweetness, and our hope!\nTo thee do we cry,\npoor banished children of Eve;\nto thee do we send up our sighs,\nmourning and weeping in this valley of tears.\nTurn then, most gracious Advocate,\nthine eyes of mercy toward us;\nand after this our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving,\nO sweet Virgin Mary!\nAmen.`,
  },
  {
    name: 'Prayer to St. Michael',
    language: 'English',
    text: `Saint Michael the Archangel,\ndefend us in battle.\nBe our defense against the wickedness\nand snares of the Devil.\nMay God rebuke him, we humbly pray,\nand do thou, O Prince of the heavenly hosts,\nby the power of God,\nthrust into hell Satan,\nand all the evil spirits\nwho prowl about the world\nseeking the ruin of souls.\nAmen.`,
  },
  {
    name: 'Come, Holy Spirit',
    language: 'English',
    text: `Come, Holy Spirit, fill the hearts of Thy faithful\nand kindle in them the fire of Thy love.\nSend forth Thy Spirit and they shall be created.\nAnd Thou shalt renew the face of the earth.\nO God, who by the light of the Holy Spirit\ndidst instruct the hearts of the faithful,\ngrant that by the same Holy Spirit\nwe may be truly wise and ever rejoice\nin His consolations.\nThrough Christ our Lord.\nAmen.`,
  },
  {
    name: 'Sub Tuum Praesidium',
    language: 'Latin',
    text: `Sub tuum praesidium confugimus,\nSancta Dei Genetrix.\nNostras deprecationes ne despicias\nin necessitatibus nostris,\nsed a periculis cunctis libera nos semper,\nVirgo gloriosa et benedicta.\nAmen.`,
  },
  {
    name: 'Anima Christi',
    language: 'Latin',
    text: `Anima Christi, sanctifica me.\nCorpus Christi, salva me.\nSanguis Christi, inebria me.\nAqua lateris Christi, lava me.\nPassio Christi, conforta me.\nO bone Iesu, exaudi me.\nIntra tua vulnera absconde me.\nNe permittas me separari a te.\nAb hoste maligno defende me.\nIn hora mortis meae voca me.\nEt iube me venire ad te,\nut cum Sanctis tuis laudem te\nin saecula saeculorum.\nAmen.`,
  },
  {
    name: 'Act of Faith',
    language: 'English',
    text: `O my God, I firmly believe\nthat Thou art one God in three Divine Persons:\nFather, Son, and Holy Spirit.\nI believe that Thy Divine Son became man\nand died for our sins,\nand that He will come to judge the living and the dead.\nI believe these and all the truths\nwhich the Holy Catholic Church teaches,\nbecause Thou hast revealed them,\nwho can neither deceive nor be deceived.\nAmen.`,
  },
  {
    name: 'Act of Hope',
    language: 'English',
    text: `O my God,\nrelying on Thy infinite goodness and promises,\nI hope to obtain pardon of my sins,\nthe help of Thy grace,\nand life everlasting,\nthrough the merits of Jesus Christ,\nmy Lord and Redeemer.\nAmen.`,
  },
  {
    name: 'Act of Love',
    language: 'English',
    text: `O my God, I love Thee above all things,\nwith my whole heart and soul,\nbecause Thou art all-good\nand worthy of all love.\nI love my neighbor as myself\nfor the love of Thee.\nI forgive all who have injured me\nand ask pardon of all\nwhom I have injured.\nAmen.`,
  },
  {
    name: 'Prayer Before a Crucifix',
    language: 'English',
    text: `Look down upon me, good and gentle Jesus,\nwhile before Thy face I humbly kneel,\nand with burning soul\npray and beseech Thee\nto fix deep in my heart\nlively sentiments of faith, hope, and charity,\ntrue contrition for my sins,\nand a firm purpose of amendment.\nWhile I contemplate with great love and tender pity\nThy five most precious wounds,\npondering over them within me,\ncalling to mind the words\nwhich David, Thy prophet, said of Thee,\nmy Jesus: "They have pierced my hands and my feet;\nthey have numbered all my bones."\nAmen.`,
  },
  {
    name: 'Fatima Prayer',
    language: 'English',
    text: `O my Jesus, forgive us our sins,\nsave us from the fires of hell,\nlead all souls to Heaven,\nespecially those in most need of Thy mercy.\nAmen.`,
  },
  {
    name: 'Prayer to St. Joseph',
    language: 'English',
    text: `O Blessed Joseph,\nhappy man, to whom it was given not only to see\nand to hear that God Whom many kings longed to see,\nyet saw not, longed to hear, yet heard not;\nbut also to carry Him in your arms,\nto embrace Him, to clothe Him,\nand to guard and defend Him.\nV. Pray for us, O Blessed Joseph.\nR. That we may be made worthy of the promises of Christ.\nAmen.`,
  },
  {
    name: 'Regina Caeli',
    language: 'Latin',
    text: `Regina caeli, laetare, alleluia:\nquia quem meruisti portare, alleluia,\nresurrexit, sicut dixit, alleluia.\nOra pro nobis Deum, alleluia.\nGaude et laetare, Virgo Maria, alleluia.\nQuia surrexit Dominus vere, alleluia.\nAmen.`,
  },
  {
    name: 'Apostles\' Creed',
    language: 'English',
    text: `I believe in God,\nthe Father Almighty,\nCreator of Heaven and earth;\nand in Jesus Christ,\nHis only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died and was buried.\nHe descended into Hell;\non the third day He rose again from the dead;\nHe ascended into Heaven,\nand is seated at the right hand of God the Father Almighty;\nfrom there He will come to judge the living and the dead.\nI believe in the Holy Spirit,\nthe Holy Catholic Church,\nthe communion of Saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\nAmen.`,
  },
  {
    name: 'O Sacrament Most Holy',
    language: 'English',
    text: `O Sacrament most Holy,\nO Sacrament Divine,\nAll praise and all thanksgiving,\nBe every moment Thine!\nAmen.`,
  },
  {
    name: 'Eternal Rest (for the Departed)',
    language: 'English',
    text: `Eternal rest grant unto them, O Lord,\nand let perpetual light shine upon them.\nMay the souls of all the faithful departed,\nthrough the mercy of God, rest in peace.\nAmen.`,
  },
  {
    name: 'Tantum Ergo',
    language: 'Latin',
    text: `Tantum ergo Sacramentum\nVeneremur cernui:\nEt antiquum documentum\nNovo cedat ritui:\nPraestet fides supplementum\nSensuum defectui.\nGenitori, Genitoque\nLaus et iubilatio,\nSalus, honor, virtus quoque\nSit et benedictio:\nProcedenti ab utroque\nCompar sit laudatio.\nAmen.`,
  },
  {
    name: 'Veni Creator Spiritus (Come, Creator Spirit)',
    language: 'Latin',
    text: `Veni, Creator Spiritus,\nmentes tuorum visita,\nimple superna gratia\nquae tu creasti pectora.\nQui diceris Paraclitus,\naltissimi donum Dei,\nfons vivus, ignis, caritas,\net spiritalis unctio.\nAmen.`,
  },
  {
    name: 'Ave Maris Stella',
    language: 'Latin',
    text: `Ave maris stella,\nDei mater alma,\natque semper Virgo,\nfelix caeli porta.\nSumens illud Ave\nGabrielis ore,\nfunda nos in pace,\nmutans Evae nomen.\nAmen.`,
  },
  {
    name: 'Confiteor',
    language: 'Latin',
    text: `Confiteor Deo omnipotenti\net vobis, fratres,\nquia peccavi nimis\ncogitatione, verbo,\nopere et omissione:\nmea culpa, mea culpa,\nmea maxima culpa.\nIdeoque precor beatam Mariam semper Virginem,\nomnes Angelos et Sanctos,\net vos, fratres,\norare pro me\nad Dominum Deum nostrum.\nAmen.`,
  },
];

// ─── Rosary Mysteries ────────────────────────────────────────────────────────

const ROSARY_MYSTERIES = {
  Joyful: {
    subtitle: 'Joyful Mysteries',
    days: 'Monday & Saturday',
    mysteries: [
      'The Annunciation',
      'The Visitation',
      'The Nativity of Jesus',
      'The Presentation in the Temple',
      'The Finding of Jesus in the Temple',
    ],
  },
  Luminous: {
    subtitle: 'Luminous Mysteries',
    days: 'Thursday',
    mysteries: [
      'The Baptism of Jesus',
      'The Wedding at Cana',
      'The Proclamation of the Kingdom',
      'The Transfiguration',
      'The Institution of the Eucharist',
    ],
  },
  Sorrowful: {
    subtitle: 'Sorrowful Mysteries',
    days: 'Tuesday & Friday',
    mysteries: [
      'The Agony in the Garden',
      'The Scourging at the Pillar',
      'The Crowning with Thorns',
      'The Carrying of the Cross',
      'The Crucifixion and Death of Jesus',
    ],
  },
  Glorious: {
    subtitle: 'Glorious Mysteries',
    days: 'Wednesday & Sunday',
    mysteries: [
      'The Resurrection',
      'The Ascension',
      'The Descent of the Holy Spirit',
      'The Assumption of Mary',
      'The Coronation of Mary',
    ],
  },
};

const DAY_TO_MYSTERY = ['Glorious', 'Joyful', 'Sorrowful', 'Glorious', 'Luminous', 'Sorrowful', 'Joyful'];

// ─── Liturgical Season Calculation ──────────────────────────────────────────

function getEaster(year) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

// First Sunday of Advent = Sunday on or before Dec 3
function firstSundayOfAdvent(year) {
  const dec3 = new Date(year, 11, 3);
  return new Date(year, 11, 3 - dec3.getDay());
}

// Sunday after Epiphany (Baptism of the Lord)
// Baptism of Lord is the Sunday after Jan 6; if Jan 6 is Sunday, then Jan 13
function baptismOfTheLord(year) {
  const jan6 = new Date(year, 0, 6);
  const day = jan6.getDay();
  if (day === 0) return new Date(year, 0, 13);
  return new Date(year, 0, 6 + (7 - day));
}

function getLiturgicalInfo(date) {
  const y = date.getFullYear();
  const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // Easter-relative dates
  const easter = getEaster(y);
  const ashWed = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const holyThurs = addDays(easter, -3);
  const pentecost = addDays(easter, 49);
  const ascension = addDays(easter, 39); // Thursday; some dioceses move to Sunday +42

  // Advent
  const advent = firstSundayOfAdvent(y);
  const prevAdvent = firstSundayOfAdvent(y - 1);

  // Baptism of Lord (end of Christmas)
  const botl = baptismOfTheLord(y);
  const botlPrev = baptismOfTheLord(y - 1);  // for dates in Jan

  // Determine liturgical year (A/B/C)
  // Liturgical year Y starts in Advent of year Y-1
  let litYear;
  if (date >= advent) {
    litYear = y + 1;
  } else {
    litYear = y;
  }
  const cycle = ['A', 'B', 'C'][(litYear - 1) % 3];

  // Weekday cycle: I = odd calendar year of Jan 1 of liturgical year, II = even
  // Actually: Year I in odd-numbered calendar years, Year II in even years
  // Based on calendar year
  const weekdayCycle = y % 2 === 1 ? 'I' : 'II';

  let season, color, week, seasonLabel;

  // Check fixed major feasts first
  if (FIXED_FEASTS[mmdd]) {
    const feast = FIXED_FEASTS[mmdd];
    season = 'feast';
    seasonLabel = feast.label;
    // Color by feast type
    if (mmdd === '12-25') { color = '#8B6914'; }
    else if (mmdd === '12-08') { color = '#1565C0'; }
    else { color = '#6A0DAD'; }
    return { season, seasonLabel, color, cycle, weekdayCycle, week: 0, litYear, feast };
  }

  // Advent
  if (date >= advent || date < new Date(y, 11, 25)) {
    if (date >= advent) {
      season = 'advent';
      const weekNum = Math.floor(daysBetween(advent, date) / 7) + 1;
      // Gaudete Sunday = 3rd Sunday of Advent
      const isSunday = date.getDay() === 0;
      const gaudete = addDays(advent, 14);
      if (isSunday && weekNum === 3) {
        color = '#A0522D';
        seasonLabel = 'Advent — Gaudete Sunday';
      } else {
        color = '#4B0082';
        seasonLabel = `Advent`;
      }
      week = weekNum;
      return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
    }
  }

  // For dates Jan 1 – before Baptism of Lord
  if (date < botl && date.getMonth() < 2) {
    if (date >= new Date(y, 11, 25) || date.getMonth() === 0) {
      // Christmas season
      if (date < botl) {
        season = 'christmas';
        seasonLabel = 'Christmas Season';
        color = '#8B6914';
        week = 1;
        return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
      }
    }
  }

  // After Dec 25
  if (date >= new Date(y, 11, 25)) {
    season = 'christmas';
    seasonLabel = 'Christmas Season';
    color = '#8B6914';
    week = 1;
    return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
  }

  // Lent
  if (date >= ashWed && date < easter) {
    season = 'lent';
    const lentWeek = Math.floor(daysBetween(ashWed, date) / 7) + 1;
    const isSunday = date.getDay() === 0;
    // Laetare = 4th Sunday of Lent
    const laetare = addDays(palmSunday, -21);
    if (isSunday && date.getTime() === laetare.getTime()) {
      color = '#C2185B';
      seasonLabel = 'Lent — Laetare Sunday';
    } else if (date >= palmSunday) {
      color = '#880E4F';
      seasonLabel = 'Holy Week';
    } else {
      color = '#4B0082';
      seasonLabel = 'Lent';
    }
    week = lentWeek;
    return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
  }

  // Easter Triduum
  if (date >= holyThurs && date < easter) {
    season = 'triduum';
    seasonLabel = 'Sacred Triduum';
    color = '#880E4F';
    week = 0;
    return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
  }

  // Easter Season
  if (date >= easter && date <= pentecost) {
    season = 'easter';
    const easterWeek = Math.floor(daysBetween(easter, date) / 7) + 1;
    if (date.getTime() === pentecost.getTime()) {
      color = '#C62828';
      seasonLabel = 'Pentecost Sunday';
    } else {
      color = '#C49A22';
      seasonLabel = 'Easter Season';
    }
    week = easterWeek;
    return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
  }

  // Ordinary Time
  season = 'ordinary';
  color = '#2E7D32';

  // Ordinary Time Week calculation
  // First OT after Christmas ends at Ash Wednesday
  // OT weeks start from Baptism of Lord
  const otStart = botl.getTime() <= date.getTime() && date < ashWed ? botl : addDays(pentecost, 1);
  let otWeek;
  if (date >= botl && date < ashWed) {
    otWeek = Math.floor(daysBetween(botl, date) / 7) + 2; // Week 2 starts after Baptism
  } else {
    // After Pentecost: continue OT week count
    // OT ends on last Sunday before Advent
    // The week number after Pentecost depends on how many OT weeks were used before Lent
    const otWeeksBeforeLent = Math.floor(daysBetween(botl, ashWed) / 7);
    const weeksAfterPentecost = Math.floor(daysBetween(pentecost, date) / 7);
    otWeek = otWeeksBeforeLent + weeksAfterPentecost + 1;
    if (otWeek > 34) otWeek = 34;
  }

  // Trinity Sunday = 1st Sunday after Pentecost
  const trinitySunday = addDays(pentecost, 7);
  if (date.getDay() === 0 && date.getTime() === trinitySunday.getTime()) {
    seasonLabel = 'Solemnity of the Most Holy Trinity';
    color = '#2E7D32';
  } else {
    // Corpus Christi = Thursday after Trinity (or Sunday in some places)
    const corpusChristi = addDays(trinitySunday, 4);
    if (date.getTime() === corpusChristi.getTime()) {
      seasonLabel = 'Solemnity of the Body and Blood of Christ';
      color = '#8B6914';
    } else {
      seasonLabel = 'Ordinary Time';
    }
  }

  week = Math.max(1, Math.min(34, otWeek));
  return { season, seasonLabel, color, cycle, weekdayCycle, week, litYear };
}

// ─── Mass Readings Lookup ────────────────────────────────────────────────────

function getMassReadings(date, liturgy) {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const isSunday = date.getDay() === 0;

  // Fixed feasts override everything
  if (liturgy.feast) return { ...liturgy.feast };

  const { cycle, season, week } = liturgy;
  const cycleData = SUNDAY_READINGS[cycle];

  if (!cycleData) return null;

  if (isSunday) {
    switch (season) {
      case 'advent': {
        const idx = Math.min(week - 1, 3);
        return cycleData.advent[idx] || null;
      }
      case 'christmas': {
        // Holy Family, Epiphany, Baptism
        // Simple date-based logic
        const m = date.getMonth(), d = date.getDate();
        if (m === 11 && d >= 26 && d <= 31) return { ...cycleData.christmas[0], label: 'Holy Family' };
        if (m === 0 && d >= 2 && d <= 8) return { ...cycleData.christmas[1], label: 'Epiphany' };
        return { ...cycleData.christmas[2], label: 'Baptism of the Lord' };
      }
      case 'lent': {
        const idx = Math.min(week - 1, 5);
        return cycleData.lent[idx] || null;
      }
      case 'triduum':
        return null;
      case 'easter': {
        const idx = Math.min(week - 1, 8);
        return cycleData.easter[idx] || null;
      }
      case 'ordinary': {
        const idx = Math.min(week, cycleData.ordinary.length - 1);
        return cycleData.ordinary[idx] || null;
      }
      default:
        return null;
    }
  }

  // Weekday — return cycle and week for reference
  return null;
}

// ─── Divine Office Helper ────────────────────────────────────────────────────

function getDivineOffice(date, liturgy) {
  const { season, week } = liturgy;
  const psalterNums = ['I', 'II', 'III', 'IV'];
  const daySlug = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()];
  const isSunday = date.getDay() === 0;
  const mm   = String(date.getMonth() + 1).padStart(2, '0');
  const dd   = String(date.getDate()).padStart(2, '0');
  const mmdd = mm + dd;

  let volume, seasonRef, psalterWeek;

  switch (season) {
    case 'advent':
      volume = 'Volume I';
      seasonRef = `Advent, Week ${week}`;
      psalterWeek = psalterNums[(week - 1) % 4];
      break;
    case 'christmas':
      volume = 'Volume I';
      seasonRef = 'Christmas Season';
      psalterWeek = 'I';
      break;
    case 'lent':
      volume = 'Volume II';
      seasonRef = `Lent, Week ${week}`;
      psalterWeek = psalterNums[(week - 1) % 4];
      break;
    case 'triduum':
      volume = 'Volume II';
      seasonRef = 'Sacred Triduum';
      psalterWeek = null;
      break;
    case 'easter':
      volume = 'Volume II';
      seasonRef = `Easter, Week ${week}`;
      psalterWeek = psalterNums[(week - 1) % 4];
      break;
    case 'ordinary':
      volume = week <= 17 ? 'Volume III' : 'Volume IV';
      seasonRef = `Ordinary Time, Week ${week}`;
      psalterWeek = psalterNums[(week - 1) % 4];
      break;
    default:
      volume = 'Volume I';
      seasonRef = 'Current Week';
      psalterWeek = 'I';
  }

  // Build per-Hour deep links to divineoffice.org.
  // URL pattern: /[season]-w[NN]-[day]-[suffix]/
  // Fixed feast days use the date-based pattern: /MMDD-[suffix]/
  const FIXED_MMDD = ['0101','0106','0815','1101','1108','1225'];
  let base;
  if (FIXED_MMDD.includes(mmdd) || season === 'feast') {
    base = `https://divineoffice.org/${mmdd}`;
  } else {
    const weekStr = String(week).padStart(2, '0');
    const seasonSlug = { advent: 'adv', christmas: 'chr', lent: 'lent',
                         triduum: 'lent', easter: 'easter', ordinary: 'ord' }[season] || 'ord';
    base = `https://divineoffice.org/${seasonSlug}-w${weekStr}-${daySlug}`;
  }

  const epSlug = isSunday ? 'ep2' : 'ep';
  const npSlug = isSunday ? 'np1' : 'np';

  const hours = [
    { icon: '🌙', name: 'Office of Readings', latin: 'Officium Lectionis', url: `${base}-or/`   },
    { icon: '🌅', name: 'Morning Prayer',      latin: 'Laudes',            url: `${base}-mp/`   },
    { icon: '☀️', name: 'Midday Prayer',       latin: 'Hora Media',        url: `${base}-dp2/`  },
    { icon: '🌇', name: 'Evening Prayer',      latin: 'Vesperae',          url: `${base}-${epSlug}/` },
    { icon: '🌃', name: 'Night Prayer',        latin: 'Completorium',      url: `${base}-${npSlug}/` },
  ];

  return { volume, seasonRef, psalterWeek, hours };
}

// ─── Daily Prayer Selection ──────────────────────────────────────────────────

function getDailyPrayer(date, liturgy) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  // In Easter season, prefer Regina Caeli
  const reginae = KIDS_PRAYERS.findIndex(p => p.name === 'Regina Caeli');
  if (liturgy.season === 'easter') {
    return KIDS_PRAYERS[reginae];
  }
  return KIDS_PRAYERS[dayOfYear % KIDS_PRAYERS.length];
}

// ─── Saint illustrations (fallback art when the feed has no photo) ────────
const ILLUSTRATIONS = {
  marian: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#1a3a6b"/><stop offset="100%" stop-color="#0d1f3c"/></radialGradient>
      <radialGradient id="mhalo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5d78e" stop-opacity=".5"/><stop offset="100%" stop-color="#f5d78e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#mg)"/>
    ${Array.from({length:12},(_,i)=>{const a=i*30-90,r=72,x=210+r*Math.cos(a*Math.PI/180),y=100+r*Math.sin(a*Math.PI/180);return`<polygon points="${x},${y-6} ${x+1.5},${y-2} ${x+5.5},${y-2} ${x+2.5},${y+1} ${x+3.5},${y+5} ${x},${y+2.5} ${x-3.5},${y+5} ${x-2.5},${y+1} ${x-5.5},${y-2} ${x-1.5},${y-2}" fill="#f5d78e"/>`;}).join('')}
    <ellipse cx="210" cy="100" rx="55" ry="55" fill="url(#mhalo)"/>
    <ellipse cx="210" cy="88" rx="28" ry="30" fill="#e8d0f0"/>
    <path d="M182 118 Q210 160 238 118 Q225 175 210 178 Q195 175 182 118Z" fill="#c8a8e0"/>
    <ellipse cx="210" cy="84" rx="17" ry="19" fill="#f0e0c8"/>
    <path d="M193 80 Q210 60 227 80 Q230 100 227 118 Q210 112 193 118 Q190 100 193 80Z" fill="#d4b8e0" opacity=".6"/>
    <circle cx="210" cy="82" r="23" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".8"/>
    <line x1="210" y1="178" x2="210" y2="155" stroke="#5a8a4a" stroke-width="2"/>
    <ellipse cx="210" cy="150" rx="6" ry="10" fill="white" transform="rotate(-15,210,150)"/>
    <ellipse cx="217" cy="148" rx="5" ry="9" fill="white" transform="rotate(10,217,148)"/>
    <ellipse cx="203" cy="148" rx="5" ry="9" fill="white" transform="rotate(-40,203,148)"/>
    <text x="210" y="195" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  bishop: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a4a"/><stop offset="100%" stop-color="#1a0e30"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#bg)"/>
    <rect x="8" y="8" width="404" height="184" rx="6" fill="none" stroke="#8b6a2a" stroke-width="1" opacity=".6"/>
    <path d="M185 140 L195 80 L210 55 L225 80 L235 140Z" fill="#7a3a6a"/>
    <path d="M195 80 L210 55 L225 80" fill="none" stroke="#f5d78e" stroke-width="1.5"/>
    <line x1="185" y1="140" x2="235" y2="140" stroke="#f5d78e" stroke-width="1.5"/>
    <line x1="195" y1="115" x2="225" y2="115" stroke="#f5d78e" stroke-width="1"/>
    <line x1="210" y1="68" x2="210" y2="90" stroke="#f5d78e" stroke-width="2"/>
    <line x1="200" y1="76" x2="220" y2="76" stroke="#f5d78e" stroke-width="2"/>
    <circle cx="210" cy="100" r="3" fill="#c04040"/><circle cx="200" cy="125" r="2.5" fill="#4060c0"/><circle cx="220" cy="125" r="2.5" fill="#4060c0"/>
    <line x1="242" y1="160" x2="242" y2="70" stroke="#a07830" stroke-width="4" stroke-linecap="round"/>
    <path d="M242 70 Q242 50 255 50 Q268 50 268 63 Q268 75 255 78 Q248 80 242 78" fill="none" stroke="#a07830" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="210" cy="108" r="32" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".5" stroke-dasharray="3,3"/>
    <text x="210" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  martyr: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#6b1a1a"/><stop offset="100%" stop-color="#2a0808"/></radialGradient></defs>
    <rect width="420" height="200" fill="url(#rg)"/>
    <line x1="140" y1="185" x2="180" y2="60" stroke="#4a7a2a" stroke-width="3" stroke-linecap="round"/>
    ${[-20,-10,0,10,20,30,40].map((t,i)=>`<ellipse cx="${165+i*2}" cy="${155-i*14}" rx="18" ry="6" fill="#5a8a3a" transform="rotate(${-50+t},${165+i*2},${155-i*14})" opacity="${.6+i*.06}"/>`).join('')}
    <line x1="280" y1="185" x2="240" y2="60" stroke="#4a7a2a" stroke-width="3" stroke-linecap="round"/>
    ${[-20,-10,0,10,20,30,40].map((t,i)=>`<ellipse cx="${255-i*2}" cy="${155-i*14}" rx="18" ry="6" fill="#5a8a3a" transform="rotate(${50-t},${255-i*2},${155-i*14})" opacity="${.6+i*.06}"/>`).join('')}
    <rect x="204" y="40" width="12" height="110" rx="3" fill="#d4a030"/>
    <rect x="182" y="68" width="56" height="12" rx="3" fill="#d4a030"/>
    <circle cx="210" cy="100" r="45" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  apostle: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="apg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a3a2a"/><stop offset="100%" stop-color="#0d2018"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#apg)"/>
    <path d="M20,20 L50,20 M20,20 L20,50" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M400,20 L370,20 M400,20 L400,50" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M20,180 L50,180 M20,180 L20,150" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M400,180 L370,180 M400,180 L400,150" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <g transform="translate(185,100) rotate(-30)">
      <circle cx="0" cy="-40" r="18" fill="none" stroke="#c8a030" stroke-width="4"/>
      <circle cx="0" cy="-40" r="8" fill="none" stroke="#c8a030" stroke-width="3"/>
      <line x1="0" y1="-22" x2="0" y2="48" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="30" x2="10" y2="30" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="42" x2="10" y2="42" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g transform="translate(235,100) rotate(30)">
      <circle cx="0" cy="-40" r="18" fill="none" stroke="#a8a8a8" stroke-width="4"/>
      <circle cx="0" cy="-40" r="8" fill="none" stroke="#a8a8a8" stroke-width="3"/>
      <line x1="0" y1="-22" x2="0" y2="48" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="30" x2="10" y2="30" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="42" x2="10" y2="42" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
    </g>
    <circle cx="210" cy="95" r="38" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".5"/>
    <text x="210" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  friar: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="frg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2a1a"/><stop offset="100%" stop-color="#1e1408"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#frg)"/>
    <path d="M30,185 Q210,170 390,185" fill="none" stroke="#c8a030" stroke-width="2" stroke-dasharray="8,4" opacity=".5"/>
    <path d="M175,170 Q175,100 210,70 Q245,100 245,170Z" fill="#5a3a1a"/>
    <path d="M185,170 Q185,108 210,82 Q235,108 235,170Z" fill="#6b4a2a"/>
    <ellipse cx="210" cy="118" rx="22" ry="26" fill="#e8d0b0"/>
    <circle cx="210" cy="115" r="35" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".6"/>
    <line x1="210" y1="45" x2="210" y2="68" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <line x1="196" y1="50" x2="224" y2="50" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <rect x="192" y="148" width="36" height="24" rx="2" fill="#8b5a2a"/>
    <line x1="210" y1="148" x2="210" y2="172" stroke="#c8a030" stroke-width="1"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  archangel: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="argg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2a4a"/><stop offset="100%" stop-color="#080d1e"/></linearGradient>
      <radialGradient id="arglow" cx="50%" cy="45%" r="40%"><stop offset="0%" stop-color="#c8d8ff" stop-opacity=".3"/><stop offset="100%" stop-color="#c8d8ff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#argg)"/>
    <ellipse cx="210" cy="90" rx="80" ry="70" fill="url(#arglow)"/>
    <path d="M210,105 Q160,70 120,110 Q145,75 175,90 Q190,82 210,95Z" fill="#b8c8e8" opacity=".7"/>
    <path d="M210,105 Q155,85 125,125 Q150,90 178,100 Q193,94 210,105Z" fill="#d8e4f8" opacity=".5"/>
    <path d="M210,105 Q260,70 300,110 Q275,75 245,90 Q230,82 210,95Z" fill="#b8c8e8" opacity=".7"/>
    <path d="M210,105 Q265,85 295,125 Q270,90 242,100 Q227,94 210,105Z" fill="#d8e4f8" opacity=".5"/>
    <path d="M198,105 Q198,140 195,170 Q210,165 225,170 Q222,140 222,105Z" fill="#e8e4d8"/>
    <circle cx="210" cy="92" r="18" fill="#f0e0c8"/>
    <circle cx="210" cy="92" r="26" fill="none" stroke="#f5d78e" stroke-width="2" opacity=".8"/>
    <line x1="230" y1="60" x2="230" y2="155" stroke="#c8c8d8" stroke-width="3" stroke-linecap="round"/>
    <line x1="222" y1="95" x2="238" y2="95" stroke="#c8c8d8" stroke-width="4" stroke-linecap="round"/>
    <polygon points="230,58 227,68 233,68" fill="#e8d840"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  solemnity: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="solg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#4a3000"/><stop offset="100%" stop-color="#1a1000"/></radialGradient>
      <radialGradient id="solGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5d78e" stop-opacity=".6"/><stop offset="100%" stop-color="#f5d78e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#solg)"/>
    ${Array.from({length:24},(_,i)=>{const a=i*15,r1=40,r2=85,x1=210+r1*Math.cos(a*Math.PI/180),y1=95+r1*Math.sin(a*Math.PI/180),x2=210+r2*Math.cos(a*Math.PI/180),y2=95+r2*Math.sin(a*Math.PI/180);return`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f5d78e" stroke-width="${i%2===0?1:.5}" opacity="${i%2===0?.4:.2}"/>`;}).join('')}
    <circle cx="210" cy="95" r="45" fill="url(#solGlow)"/>
    <circle cx="210" cy="95" r="32" fill="#8b6a00" opacity=".8"/>
    <circle cx="210" cy="95" r="32" fill="none" stroke="#f5d78e" stroke-width="2"/>
    <text x="210" y="103" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#f5d78e">IHS</text>
    <line x1="210" y1="72" x2="210" y2="62" stroke="#f5d78e" stroke-width="2"/>
    <line x1="205" y1="66" x2="215" y2="66" stroke="#f5d78e" stroke-width="2"/>
    ${Array.from({length:8},(_,i)=>{const a=i*45,r=50,x=210+r*Math.cos(a*Math.PI/180),y=95+r*Math.sin(a*Math.PI/180);return`<circle cx="${x}" cy="${y}" r="2.5" fill="#f5d78e" opacity=".6"/>`;}).join('')}
    <text x="210" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  christmas: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="chrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#1a0a0a"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#chrg)"/>
    ${[[80,30],[150,20],[300,25],[360,35],[100,60],[340,55],[60,80],[380,70]].map(([x,y])=>`<polygon points="${x},${y-5} ${x+1.2},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.2},${y-1.5}" fill="#f5f0d0" opacity=".7"/>`).join('')}
    <polygon points="210,10 213,28 228,18 216,30 232,33 216,36 228,48 213,38 210,56 207,38 192,48 204,36 188,33 204,30 192,18 207,28" fill="#f5d030" opacity=".95"/>
    <line x1="210" y1="56" x2="210" y2="85" stroke="#f5d030" stroke-width="1.5" opacity=".5"/>
    <polygon points="120,120 210,85 300,120" fill="#3a2a1a"/>
    <rect x="175" y="135" width="70" height="30" rx="4" fill="#6a4a1a"/>
    <ellipse cx="210" cy="140" rx="20" ry="10" fill="#f0e0c8"/>
    <ellipse cx="210" cy="132" rx="10" ry="10" fill="#f0e0c8"/>
    <circle cx="210" cy="132" r="14" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".8"/>
    <ellipse cx="160" cy="138" rx="12" ry="22" fill="#1a2a6a"/>
    <circle cx="160" cy="116" r="10" fill="#3a1a00"/>
    <ellipse cx="258" cy="135" rx="13" ry="25" fill="#2a1a00"/>
    <circle cx="258" cy="110" r="11" fill="#2a1a00"/>
    <line x1="272" y1="100" x2="258" y2="160" stroke="#4a3a1a" stroke-width="3"/>
    <text x="210" y="186" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  monk: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="mkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a0a"/><stop offset="100%" stop-color="#0a0a05"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#mkg)"/>
    <rect x="10" y="10" width="400" height="180" rx="5" fill="none" stroke="#8b6a2a" stroke-width="2"/>
    ${[[30,30],[390,30],[30,170],[390,170]].map(([cx,cy])=>`<circle cx="${cx}" cy="${cy}" r="6" fill="#8b6a2a"/><circle cx="${cx}" cy="${cy}" r="3" fill="#f5d78e"/>`).join('')}
    <path d="M150,130 Q150,90 210,85 Q270,90 270,130 Q270,150 210,155 Q150,150 150,130Z" fill="#f5e8c8"/>
    <line x1="210" y1="85" x2="210" y2="155" stroke="#8b6a2a" stroke-width="1.5"/>
    ${[100,110,120,130,140].map(y=>`<line x1="160" y1="${y}" x2="206" y2="${y}" stroke="#6a4a1a" stroke-width="1" opacity=".4"/><line x1="214" y1="${y}" x2="260" y2="${y}" stroke="#6a4a1a" stroke-width="1" opacity=".4"/>`).join('')}
    <line x1="210" y1="35" x2="210" y2="78" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <line x1="190" y1="50" x2="230" y2="50" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <circle cx="210" cy="56" r="26" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4" stroke-dasharray="4,4"/>
    <text x="210" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  mystic: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mysg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#3a1a4a"/><stop offset="100%" stop-color="#150a20"/></radialGradient>
      <radialGradient id="mysHeart" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#e04040"/><stop offset="100%" stop-color="#801818"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#mysg)"/>
    ${Array.from({length:20},(_,i)=>`<circle cx="${60+i*16}" cy="${40+Math.sin(i*0.8)*30}" r="1.5" fill="#f5d78e" opacity="${.2+i%3*.2}"/>`).join('')}
    <path d="M210,145 Q180,120 180,105 Q180,88 195,85 Q205,82 210,90 Q215,82 225,85 Q240,88 240,105 Q240,120 210,145Z" fill="url(#mysHeart)"/>
    <path d="M200,87 Q197,72 202,65 Q204,78 208,72 Q206,82 210,78 Q214,82 212,72 Q216,78 218,65 Q223,72 220,87" fill="#f5a030" opacity=".9"/>
    <line x1="210" y1="95" x2="210" y2="118" stroke="#f5d78e" stroke-width="2"/>
    <line x1="202" y1="103" x2="218" y2="103" stroke="#f5d78e" stroke-width="2"/>
    <circle cx="210" cy="112" r="24" fill="none" stroke="#6a4a1a" stroke-width="2" stroke-dasharray="3,2"/>
    <circle cx="210" cy="100" r="55" fill="none" stroke="#f5d78e" stroke-width=".5" opacity=".3"/>
    <circle cx="210" cy="100" r="48" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    <text x="210" y="186" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  default: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="defg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2a1a0a"/><stop offset="100%" stop-color="#1a0e05"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#defg)"/>
    <rect x="12" y="12" width="396" height="176" rx="6" fill="none" stroke="#8b6a2a" stroke-width="1.5"/>
    <rect x="204" y="30" width="12" height="130" rx="4" fill="#c8a030"/>
    <rect x="170" y="68" width="80" height="14" rx="4" fill="#c8a030"/>
    <circle cx="210" cy="95" r="52" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    ${[[210,35],[210,155],[150,95],[270,95]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#f5d78e" opacity=".5"/>`).join('')}
    <text x="210" y="182" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,
};

function getIllustration(saint) {
  const t = (saint.tags || []).join(' ').toLowerCase();
  const n = (saint.name || '').toLowerCase();
  if (/christmas|nativity of our lord/.test(n))                              return ILLUSTRATIONS.christmas(saint.name);
  if (/mary|marian|virgin|assumption|immaculate|annunciation|visitation/.test(n + t)) return ILLUSTRATIONS.marian(saint.name);
  if (/archangel/.test(t + n))                                               return ILLUSTRATIONS.archangel(saint.name);
  if (/apostle/.test(t))                                                     return ILLUSTRATIONS.apostle(saint.name);
  if (/martyr/.test(t))                                                      return ILLUSTRATIONS.martyr(saint.name);
  if (/mystic|carmelite/.test(t + n))                                        return ILLUSTRATIONS.mystic(saint.name);
  if (/friar|franciscan/.test(t + n))                                        return ILLUSTRATIONS.friar(saint.name);
  if (/monk|abbot|benedic/.test(t + n))                                      return ILLUSTRATIONS.monk(saint.name);
  if (/bishop|doctor|theologian|pope/.test(t))                               return ILLUSTRATIONS.bishop(saint.name);
  if (/solemnity/.test(t))                                                   return ILLUSTRATIONS.solemnity(saint.name);
  return ILLUSTRATIONS.default(saint.name);
}

// ─── Saint of the Day ────────────────────────────────────────────────────────
// Ported from the standalone saint-of-day-card so the two cards can live as
// one. Curated dates below are authoritative for rank, tags and quote; the
// uCatholic feed fills in every other day of the year.

const SAINTS = {
  '01-01': { name:'Mary, Mother of God', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'January 1st honors Mary as the Mother of God (Theotokos), proclaimed at the Council of Ephesus in 431 AD. This is the oldest Marian feast in the Western Church, celebrating her unique role as the mother of Jesus Christ.', quote:'My soul magnifies the Lord, and my spirit rejoices in God my Savior.', quoteSource:'Luke 1:46–47', url:'https://en.wikipedia.org/wiki/Mary,_mother_of_Jesus' },
  '01-17': { name:'Saint Anthony the Great', feast:'Memorial', tags:['Desert Father','Monk','Abbot'], bio:'Anthony (251–356 AD) was an Egyptian Christian monk known as the "Father of Monasticism." He withdrew into the desert and is said to have lived to 105 years old, inspiring countless monastic communities.', quote:'Humility is the foundation of all the other virtues.', quoteSource:'St. Anthony the Great', url:'https://en.wikipedia.org/wiki/Anthony_the_Great' },
  '01-24': { name:'Saint Francis de Sales', feast:'Memorial', tags:['Bishop','Doctor of the Church','Writer'], bio:'Francis de Sales (1567–1622) was the Bishop of Geneva and a prolific spiritual writer. His "Introduction to the Devout Life" remains a beloved guide to holiness for lay people. He is the patron saint of writers and journalists.', quote:'Nothing is so strong as gentleness, nothing so gentle as real strength.', quoteSource:'St. Francis de Sales', url:'https://en.wikipedia.org/wiki/Francis_de_Sales' },
  '01-28': { name:'Saint Thomas Aquinas', feast:'Memorial', tags:['Doctor of the Church','Friar','Theologian'], bio:'Thomas Aquinas (1225–1274) was an Italian Dominican friar whose "Summa Theologiae" synthesized Christian theology with Aristotelian philosophy. He is the patron saint of students and universities.', quote:'The things that we love tell us what we are.', quoteSource:'St. Thomas Aquinas', url:'https://en.wikipedia.org/wiki/Thomas_Aquinas' },
  '02-14': { name:'Saints Cyril and Methodius', feast:'Feast Day', tags:['Apostles to the Slavs','Missionaries','Doctors of the Church'], bio:'Cyril (826–869) and Methodius (815–885) were Greek brothers who evangelized the Slavic peoples. Cyril created the Glagolitic alphabet so scripture could be translated into the Slavic language. They are co-patrons of Europe.', quote:'Among peoples there is only one God, one faith, one baptism.', quoteSource:'St. Cyril', url:'https://en.wikipedia.org/wiki/Saints_Cyril_and_Methodius' },
  '03-17': { name:'Saint Patrick', feast:'Feast Day', tags:['Bishop','Patron of Ireland','Missionary'], bio:'Patrick (385–461 AD) was kidnapped into Irish slavery at 16. After escaping, he returned as a missionary, converting thousands, ordaining priests, and establishing the Church throughout Ireland.', quote:'Christ with me, Christ before me, Christ behind me, Christ in me.', quoteSource:"St. Patrick's Breastplate", url:'https://en.wikipedia.org/wiki/Saint_Patrick' },
  '03-19': { name:'Saint Joseph', feast:'Solemnity', tags:['Solemnity','Patron of the Universal Church','Worker'], bio:'Joseph was the husband of the Virgin Mary and foster father of Jesus Christ. A carpenter from Nazareth, he protected the Holy Family and raised Jesus with great love. He is patron of the Universal Church, workers, and fathers.', quote:'Joseph did as the angel of the Lord commanded him.', quoteSource:'Matthew 1:24', url:'https://en.wikipedia.org/wiki/Saint_Joseph' },
  '03-25': { name:'Annunciation of the Lord', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Incarnation'], bio:"The Annunciation celebrates the angel Gabriel's announcement to Mary that she would conceive the Son of God. Mary's \"fiat\" marks the moment of the Incarnation, nine months before Christmas.", quote:'Behold, I am the handmaid of the Lord. Let it be done to me according to your word.', quoteSource:'Luke 1:38', url:'https://en.wikipedia.org/wiki/Annunciation' },
  '04-23': { name:'Saint George', feast:'Optional Memorial', tags:['Martyr','Patron of England','Soldier'], bio:'George (died c. 303 AD) was a Roman soldier who refused to renounce his faith under Emperor Diocletian and was martyred. He is patron of England, Georgia, Portugal, and many other nations.', quote:'I am a Christian, and I will not deny my faith.', quoteSource:'St. George (traditional)', url:'https://en.wikipedia.org/wiki/Saint_George' },
  '04-29': { name:'Saint Catherine of Siena', feast:'Feast Day', tags:['Doctor of the Church','Dominican','Mystic'], bio:'Catherine of Siena (1347–1380) was a Dominican mystic and Doctor of the Church. Her letters urging Pope Gregory XI to return from Avignon helped end the Avignon papacy. She cared for the poor and received the stigmata.', quote:'Be who God meant you to be and you will set the world on fire.', quoteSource:'St. Catherine of Siena', url:'https://en.wikipedia.org/wiki/Catherine_of_Siena' },
  '06-13': { name:'Saint Anthony of Padua', feast:'Memorial', tags:['Doctor of the Church','Friar','Patron of Lost Things'], bio:'Anthony of Padua (1195–1231) was a Portuguese Franciscan friar renowned for preaching and care for the poor. He is the patron of lost things and was proclaimed a Doctor of the Church within a year of his death.', quote:'Actions speak louder than words; let your words teach and your actions speak.', quoteSource:'St. Anthony of Padua', url:'https://en.wikipedia.org/wiki/Anthony_of_Padua' },
  '06-21': { name:'Saint Aloysius Gonzaga', feast:'Memorial', tags:['Jesuit','Patron of Youth'], bio:'Aloysius Gonzaga (1568–1591) renounced his title to join the Jesuits and died at 23 caring for plague victims. He is the patron saint of youth and Catholic students.', quote:'I am a piece of crooked iron and I came into religion to be made straight by the hammer of penance.', quoteSource:'St. Aloysius Gonzaga', url:'https://en.wikipedia.org/wiki/Aloysius_Gonzaga' },
  '06-24': { name:'Birth of Saint John the Baptist', feast:'Solemnity', tags:['Solemnity','Prophet','Forerunner of Christ'], bio:'John the Baptist was the forerunner of Jesus Christ. Born miraculously to Elizabeth and Zechariah, he baptized Jesus in the Jordan. He is the only saint besides Mary whose birth is celebrated as a Solemnity.', quote:'He must increase, but I must decrease.', quoteSource:'John 3:30', url:'https://en.wikipedia.org/wiki/John_the_Baptist' },
  '06-27': { name:'Saint Cyril of Alexandria', feast:'Memorial', tags:['Bishop','Doctor of the Church','Theologian'], bio:'Cyril of Alexandria (376–444 AD) was Archbishop of Alexandria and one of the most important early Church theologians. He championed the title "Theotokos" for Mary at the Council of Ephesus in 431, defending the unity of Christ\'s divine and human natures.', quote:'We confess our Lord Jesus Christ, the only begotten Son of God, perfect God and perfect man.', quoteSource:'St. Cyril of Alexandria', url:'https://en.wikipedia.org/wiki/Cyril_of_Alexandria' },
  '06-28': { name:'Saint Irenaeus', feast:'Memorial', tags:['Bishop','Doctor of the Church','Martyr'], bio:'Irenaeus (c. 130–202 AD) was Bishop of Lyon and an early Church Father who combated Gnostic heresies. His "Against Heresies" is one of the earliest expositions of Christian theology.', quote:'The glory of God is man fully alive, and the life of man is the vision of God.', quoteSource:'St. Irenaeus', url:'https://en.wikipedia.org/wiki/Irenaeus' },
  '06-29': { name:'Saints Peter and Paul', feast:'Solemnity', tags:['Solemnity','Apostles','Martyrs'], bio:'This solemnity celebrates Peter the fisherman, first Pope, and Paul the great missionary. Both were martyred in Rome under Nero. Together they represent the twin pillars of the Catholic Church.', quote:'You are the Christ, the Son of the living God.', quoteSource:'Matthew 16:16', url:'https://en.wikipedia.org/wiki/Feast_of_Saints_Peter_and_Paul' },
  '07-11': { name:'Saint Benedict', feast:'Feast Day', tags:['Monk','Abbot','Patron of Europe'], bio:'Benedict of Nursia (480–547 AD) founded Western monasticism. His Rule, emphasizing prayer and work ("Ora et Labora"), shaped European civilization for centuries. He is the patron of Europe.', quote:'Prefer nothing whatever to Christ, and may he lead us all together to everlasting life.', quoteSource:'St. Benedict, The Rule', url:'https://en.wikipedia.org/wiki/Benedict_of_Nursia' },
  '07-22': { name:'Saint Mary Magdalene', feast:'Feast Day', tags:['Apostle to the Apostles','Disciple','Martyr'], bio:'Mary Magdalene was the first witness of the Resurrection, earning the title "Apostle to the Apostles." She remained at the Cross when most apostles fled. Pope Francis elevated her feast to Feast Day in 2016.', quote:'I have seen the Lord!', quoteSource:'John 20:18', url:'https://en.wikipedia.org/wiki/Mary_Magdalene' },
  '07-25': { name:'Saint James the Apostle', feast:'Feast Day', tags:['Apostle','Martyr','Patron of Spain'], bio:'James, son of Zebedee, was the first apostle martyred, executed by Herod Agrippa around 44 AD. His tomb at Santiago de Compostela became one of the greatest medieval pilgrimage destinations.', quote:'Lord, we will drink the cup you drink.', quoteSource:'Mark 10:39', url:'https://en.wikipedia.org/wiki/James,_son_of_Zebedee' },
  '08-10': { name:'Saint Lawrence', feast:'Feast Day', tags:['Deacon','Martyr','Patron of the Poor'], bio:'Lawrence (225–258 AD) was a deacon of Rome who, when ordered to surrender Church treasures, presented the poor saying "These are the treasures of the Church." He was martyred by roasting under Emperor Valerian.', quote:'The Church is truly rich, far richer than your emperor.', quoteSource:'St. Lawrence (traditional)', url:'https://en.wikipedia.org/wiki/Saint_Lawrence' },
  '08-15': { name:'Assumption of the Blessed Virgin Mary', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'The Assumption celebrates Mary being taken body and soul into heavenly glory. Defined as dogma by Pope Pius XII in 1950, it is one of the most ancient Marian feasts and a Holy Day of Obligation.', quote:'For he who is mighty has done great things for me, and holy is his name.', quoteSource:'Luke 1:49', url:'https://en.wikipedia.org/wiki/Assumption_of_Mary' },
  '08-28': { name:'Saint Augustine of Hippo', feast:'Memorial', tags:['Bishop','Doctor of the Church','Theologian'], bio:'Augustine (354–430 AD) is one of the greatest theologians in history. His "Confessions" and "City of God" remain masterpieces of world literature. He converted after years of searching and the prayers of his mother, Saint Monica.', quote:'Our heart is restless until it finds its rest in Thee.', quoteSource:'St. Augustine, Confessions', url:'https://en.wikipedia.org/wiki/Augustine_of_Hippo' },
  '09-08': { name:'Nativity of the Blessed Virgin Mary', feast:'Feast Day', tags:['Feast Day','Blessed Virgin Mary','Marian'], bio:"This feast celebrates the birth of the Virgin Mary, observed nine months after her Immaculate Conception. Mary's birth has been celebrated since the 7th century as the dawn before the Sunrise of salvation.", quote:'Blessed are you among women, and blessed is the fruit of your womb.', quoteSource:'Luke 1:42', url:'https://en.wikipedia.org/wiki/Nativity_of_Mary' },
  '09-29': { name:'Sts. Michael, Gabriel & Raphael', feast:'Feast Day', tags:['Archangels','Feast Day'], bio:"Michaelmas honors three archangels: Michael the warrior, Gabriel the messenger who announced the Incarnation to Mary, and Raphael the healer. Together they represent God's protection, communication, and healing.", quote:'Behold, I send an angel before you to guard you on the way.', quoteSource:'Exodus 23:20', url:'https://en.wikipedia.org/wiki/Archangel' },
  '10-01': { name:'Saint Thérèse of Lisieux', feast:'Memorial', tags:['Doctor of the Church','Carmelite','Mystic'], bio:'Thérèse Martin (1873–1897) entered Carmel at 15 and died at 24. Her "Little Way" of doing small things with great love became one of the most influential spiritual paths in modern Catholicism. She is a Doctor of the Church.', quote:'Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word.', quoteSource:'St. Thérèse of Lisieux', url:'https://en.wikipedia.org/wiki/Th%C3%A9r%C3%A8se_of_Lisieux' },
  '10-04': { name:'Saint Francis of Assisi', feast:'Memorial', tags:['Friar','Patron of Animals and Ecology'], bio:'Francis of Assisi (1181–1226) renounced wealth to live in radical poverty. He founded the Franciscan Order, received the stigmata, and composed the "Canticle of the Sun." He is patron of animals and ecology.', quote:'Lord, make me an instrument of your peace. Where there is hatred, let me sow love.', quoteSource:'Peace Prayer of St. Francis', url:'https://en.wikipedia.org/wiki/Francis_of_Assisi' },
  '10-07': { name:'Our Lady of the Rosary', feast:'Memorial', tags:['Memorial','Blessed Virgin Mary','Marian'], bio:"Established after the Christian victory at Lepanto (October 7, 1571), this feast honors Mary as Our Lady of the Rosary. Meditating on the mysteries of Christ's life through repeated prayers is one of the most beloved Catholic devotions.", quote:'The Rosary is the most excellent form of prayer.', quoteSource:'Pope Leo XIII', url:'https://en.wikipedia.org/wiki/Our_Lady_of_the_Rosary' },
  '10-15': { name:'Saint Teresa of Ávila', feast:'Memorial', tags:['Doctor of the Church','Carmelite','Mystic'], bio:'Teresa of Ávila (1515–1582) was a Spanish Carmelite mystic and reformer. "The Interior Castle" and "The Way of Perfection" are masterpieces of mystical theology. She was the first woman proclaimed Doctor of the Church.', quote:'The important thing is not to think much but to love much.', quoteSource:'St. Teresa of Ávila', url:'https://en.wikipedia.org/wiki/Teresa_of_%C3%81vila' },
  '11-01': { name:"All Saints' Day", feast:'Solemnity', tags:['Solemnity','Holy Day of Obligation','All Saints'], bio:"All Saints' Day honors every saint — known and unknown — who have attained heavenly glory. This solemnity affirms the Church's belief in the Communion of Saints and the universal call to holiness.", quote:'Blessed are the pure in heart, for they shall see God.', quoteSource:'Matthew 5:8', url:"https://en.wikipedia.org/wiki/All_Saints'_Day" },
  '11-02': { name:"All Souls' Day", feast:'Commemoration', tags:['Commemoration','Prayer for the Dead'], bio:"All Souls' Day commemorates all the faithful departed, especially those in purgatory. The Church encourages prayer, Masses, and almsgiving for the dead. Established by St. Odilo of Cluny in 998.", quote:'It is a holy and wholesome thought to pray for the dead.', quoteSource:'2 Maccabees 12:46', url:"https://en.wikipedia.org/wiki/All_Souls'_Day" },
  '11-30': { name:'Saint Andrew', feast:'Feast Day', tags:['Apostle','Martyr','Patron of Scotland and Greece'], bio:"Andrew was Simon Peter's brother and among the first disciples called by Jesus. He was martyred on an X-shaped cross in Patras — now called the Cross of Saint Andrew. He is patron of Scotland and Greece.", quote:'We have found the Messiah.', quoteSource:'John 1:41', url:'https://en.wikipedia.org/wiki/Andrew_the_Apostle' },
  '12-03': { name:'Saint Francis Xavier', feast:'Memorial', tags:['Jesuit','Missionary','Patron of Missions','Martyr'], bio:'Francis Xavier (1506–1552) was a Spanish Jesuit co-founder of the Society of Jesus. He brought Christianity to India, Southeast Asia, and Japan, baptizing tens of thousands. He is the patron of missionaries.', quote:'It is not the actual physical exertion that counts, but the spirit of faith with which it is undertaken.', quoteSource:'St. Francis Xavier', url:'https://en.wikipedia.org/wiki/Francis_Xavier' },
  '12-08': { name:'Immaculate Conception', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'The Immaculate Conception holds that Mary was preserved from original sin from the first moment of her conception. Defined as dogma by Pope Pius IX in 1854, it is the patronal feast of the United States.', quote:'Hail, full of grace, the Lord is with you.', quoteSource:'Luke 1:28', url:'https://en.wikipedia.org/wiki/Immaculate_Conception' },
  '12-12': { name:'Our Lady of Guadalupe', feast:'Feast Day', tags:['Feast Day','Blessed Virgin Mary','Patron of the Americas'], bio:'In 1531 the Virgin Mary appeared to Saint Juan Diego and left her image on his cloak. She is Patron of the Americas and is venerated at the Basilica of Guadalupe, the most visited Catholic shrine in the world.', quote:'Am I not here, I who am your Mother?', quoteSource:'Our Lady of Guadalupe to Juan Diego', url:'https://en.wikipedia.org/wiki/Our_Lady_of_Guadalupe' },
  '12-25': { name:'Nativity of Our Lord Jesus Christ', feast:'Solemnity – Christmas', tags:['Solemnity','Holy Day of Obligation','Christmas'], bio:'Christmas commemorates the birth of Jesus Christ in Bethlehem, the fulfillment of centuries of prophecy. The eternal Son of God became human through the Virgin Mary — the Incarnation at the heart of the Christian faith.', quote:'For unto you is born this day in the city of David a Savior, who is Christ the Lord.', quoteSource:'Luke 2:11', url:'https://en.wikipedia.org/wiki/Christmas' },
  '12-26': { name:'Saint Stephen', feast:'Feast Day', tags:['Deacon','Martyr','Protomartyr'], bio:'Stephen was the first Christian martyr, stoned to death in Jerusalem. As he died he prayed for his killers, echoing Christ on the Cross. The young Saul of Tarsus — later St. Paul — witnessed the stoning.', quote:'Lord Jesus, receive my spirit. Lord, do not hold this sin against them.', quoteSource:'Acts 7:59–60', url:'https://en.wikipedia.org/wiki/Saint_Stephen' },
  '12-27': { name:'Saint John the Apostle', feast:'Feast Day', tags:['Apostle','Evangelist','Beloved Disciple'], bio:"John was Jesus' Beloved Disciple and the only apostle to remain at the foot of the Cross. He wrote the Fourth Gospel, three Epistles, and the Book of Revelation, and is the only apostle believed to have died of natural causes.", quote:'God so loved the world that he gave his only Son, that everyone who believes in him might have eternal life.', quoteSource:'John 3:16', url:'https://en.wikipedia.org/wiki/John_the_Apostle' },
};

function parseRSS(xml) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const perr = doc.querySelector('parsererror');
  if (perr) {
    console.info('CatholicDailyCard: saint feed: XML parser error: ' + perr.textContent.replace(/\s+/g, ' ').slice(0, 200));
    return null;
  }
  const items = Array.from(doc.getElementsByTagName('item'));
  if (!items.length) { console.info('CatholicDailyCard: saint feed: feed contained no <item> elements'); return null; }

  const item = pickFreshest(
    preferSaintItems(items, it => it.getElementsByTagName('link')[0]?.textContent),
    it => parseFeedDate(it.getElementsByTagName('pubDate')[0]?.textContent));
  if (!item) return null;

  // getElementsByTagName handles the media: namespace reliably; querySelector doesn't.
  const g = tag => item.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
  const title = g('title');
  if (!title) { console.info('CatholicDailyCard: saint feed: feed item has no title'); return null; }
  const link = g('link') || 'https://www.catholic.org/saints/';

  // WordPress feeds carry the full post in content:encoded and often lack
  // media:content; rss.app puts everything in description. Handle both.
  let imageUrl = item.getElementsByTagName('media:content')[0]?.getAttribute('url') ||
                 item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '';
  const tmp = document.createElement('div');
  tmp.innerHTML = g('content:encoded') || g('description');
  if (!imageUrl) imageUrl = tmp.querySelector('img')?.src || '';
  tmp.querySelectorAll('img').forEach(el => el.remove());
  let bio = tmp.textContent.replace(/\s+/g, ' ').replace(/The post .* appeared first on .*$/, '').trim();
  if (bio.length > 480) {
    const cut = bio.slice(0, 480);
    const end = cut.lastIndexOf('. ');
    bio = end > 200 ? cut.slice(0, end + 1) : cut + '…';
  }

  return { name: title, feast: 'Feast Day', tags: ['Catholic', 'Saint of the Day'], bio: bio || 'Visit the link below to read the full biography.', url: link, imageUrl, source: 'uCatholic' };
}

// Two sources: uCatholic's own WordPress feed (primary) and the rss.app
// mirror of it (backup). For each, try rss2json.com first — it fetches the
// feed server-side and returns JSON with CORS enabled — then the direct URL,
// then generic CORS relays.
const FEEDS = [
  'https://ucatholic.com/feed/',
  'https://rss.app/feeds/1tWSQDMDaOnerbi9.xml',
];

// uCatholic's main feed mixes saint posts (linked under /saints/) with other
// articles — restrict to saint items when any are present.
function preferSaintItems(items, linkOf) {
  const saints = items.filter(it => /\/saints?\//.test(linkOf(it) || ''));
  return saints.length ? saints : items;
}
const FEED_ATTEMPTS = FEEDS.flatMap(f => {
  const enc = encodeURIComponent(f);
  return [
    { url: 'https://api.rss2json.com/v1/api.json?rss_url=' + enc, rss2json: true },
    { url: f },
    { url: 'https://corsproxy.io/?url=' + enc },
    { url: 'https://api.allorigins.win/get?url=' + enc, json: true },
  ];
});

// Dates arrive in RFC-822 ("Sun, 12 Jul 2026 04:03:00 GMT") or SQL-ish
// ("2026-07-12 04:03:00") form depending on the source — accept both.
function parseFeedDate(s) {
  let d = new Date(String(s || ''));
  if (isNaN(d)) d = new Date(String(s || '').replace(' ', 'T') + 'Z');
  return d;
}

// Items may not be ordered newest-first, and the day's saint can be published
// the previous evening in local time — so prefer an item dated today, else
// take the newest item by pubDate as long as it is reasonably fresh (< 48h).
function pickFreshest(items, pubOf) {
  const now = new Date();
  const sameDay = d => !isNaN(d) && d.getFullYear() === now.getFullYear() &&
                       d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  const todays = items.find(it => sameDay(pubOf(it)));
  if (todays) return todays;
  let best = null, bestT = -Infinity;
  for (const it of items) {
    const t = pubOf(it).getTime();
    if (!isNaN(t) && t > bestT) { bestT = t; best = it; }
  }
  if (!best || now - bestT > 48 * 3600 * 1000) {
    console.info(`CatholicDailyCard: saint feed: feed has ${items.length} item(s); newest pubDate = ` +
                 `${best ? new Date(bestT).toString() : 'unparseable'} — too stale, ignoring.`);
    return null;
  }
  return best;
}

function parseRSS2JSON(data) {
  if (!data || data.status !== 'ok' || !Array.isArray(data.items) || !data.items.length) {
    console.info('CatholicDailyCard: saint feed: rss2json response not usable (status/items)');
    return null;
  }
  const item = pickFreshest(preferSaintItems(data.items, it => it.link),
                            it => parseFeedDate(it.pubDate));
  if (!item) return null;
  const title = (item.title || '').trim();
  if (!title) return null;
  let imageUrl = item.thumbnail || item.enclosure?.link || '';
  const tmp = document.createElement('div');
  tmp.innerHTML = item.description || item.content || '';
  if (!imageUrl) imageUrl = tmp.querySelector('img')?.src || '';
  tmp.querySelectorAll('img').forEach(el => el.remove());
  let bio = tmp.textContent.replace(/\s+/g, ' ').replace(/The post .* appeared first on .*$/, '').trim();
  if (bio.length > 480) {
    const cut = bio.slice(0, 480);
    const end = cut.lastIndexOf('. ');
    bio = end > 200 ? cut.slice(0, end + 1) : cut + '…';
  }
  return { name: title, feast: 'Feast Day', tags: ['Catholic', 'Saint of the Day'], bio: bio || 'Visit the link below to read the full biography.', url: item.link || 'https://www.catholic.org/saints/', imageUrl, source: 'uCatholic' };
}

async function fetchSaint() {
  console.info('CatholicDailyCard: fetching saint feed…');
  for (const a of FEED_ATTEMPTS) {
    const host = new URL(a.url).host;
    try {
      const r = await fetch(a.url, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) { console.info(`CatholicDailyCard: saint feed: ${host} → HTTP ${r.status}`); continue; }
      let saint, bodyPreview = '';
      if (a.rss2json) {
        const data = await r.json();
        saint = parseRSS2JSON(data);
        if (!saint) bodyPreview = JSON.stringify(data).slice(0, 120);
      } else {
        const xml = a.json ? (await r.json()).contents : await r.text();
        saint = xml ? parseRSS(xml) : null;
        if (!saint) bodyPreview = String(xml).slice(0, 120);
      }
      console.info(`CatholicDailyCard: saint feed: ${host} → 200, parsed=${!!saint}` +
                   (saint ? '' : `, body starts: ${bodyPreview}`));
      if (saint) return saint;
    } catch (e) {
      console.info(`CatholicDailyCard: saint feed: ${host} → ${e.name}: ${e.message}`);
    }
  }
  console.info('CatholicDailyCard: saint feed: all feed attempts failed, using cached/embedded data.');
  return null;
}

function saintTodayKey() {
  const d = new Date();
  return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// ─── Config ──────────────────────────────────────────────────────────────────

const CARD_DEFAULTS = {
  layout: 'vertical',
  show_readings: true,
  show_rosary: true,
  show_prayer: true,
  show_saint: true,
  show_verse: true,
  saint_image: true,
  saint_image_height: 140,
  start_collapsed: false,
};

function normalizeCardConfig(config) {
  const c = { ...CARD_DEFAULTS, ...(config || {}) };
  c.layout = ['vertical', 'horizontal'].includes(c.layout) ? c.layout : 'vertical';
  const h = Number(c.saint_image_height);
  c.saint_image_height = Number.isFinite(h) ? Math.min(Math.max(h, 60), 400) : 140;
  for (const k of ['show_readings','show_rosary','show_prayer','show_saint',
                   'show_verse','saint_image','start_collapsed']) {
    c[k] = c[k] !== false;
  }
  // start_collapsed defaults to off, so treat a missing value as false
  c.start_collapsed = config?.start_collapsed === true;
  return c;
}

// ─── Visual editor ───────────────────────────────────────────────────────────
// ha-form ships with Home Assistant, so the editor is just a schema plus the
// value/changed plumbing HA expects.
const EDITOR_SCHEMA = [
  { name: 'layout', selector: { select: {
      mode: 'dropdown',
      options: [
        { value: 'vertical',   label: 'Vertical (stacked)' },
        { value: 'horizontal', label: 'Horizontal (columns)' },
      ],
  } } },
  { name: 'saint_image', selector: { boolean: {} } },
  { name: 'saint_image_height', selector: { number: {
      min: 60, max: 400, step: 10, unit_of_measurement: 'px', mode: 'slider',
  } } },
  { name: 'start_collapsed', selector: { boolean: {} } },
  { name: 'show_verse',    selector: { boolean: {} } },
  { name: 'show_readings', selector: { boolean: {} } },
  { name: 'show_rosary',   selector: { boolean: {} } },
  { name: 'show_prayer',   selector: { boolean: {} } },
  { name: 'show_saint',    selector: { boolean: {} } },
];

const EDITOR_LABELS = {
  layout: 'Layout',
  saint_image: 'Show saint image',
  saint_image_height: 'Saint image height',
  start_collapsed: 'Start with sections collapsed',
  show_verse: 'Show scripture verse',
  show_readings: 'Show daily Mass readings',
  show_rosary: 'Show Rosary mysteries',
  show_prayer: 'Show prayer for little ones',
  show_saint: 'Show saint of the day',
};

class CatholicDailyCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = normalizeCardConfig(config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
  }

  _render() {
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (s) => EDITOR_LABELS[s.name] || s.name;
      this._form.addEventListener('value-changed', (ev) => {
        ev.stopPropagation();
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: ev.detail.value },
          bubbles: true,
          composed: true,
        }));
      });
      this.appendChild(this._form);
    }
    this._form.schema = EDITOR_SCHEMA;
    this._form.data = this._config;
    if (this._hass) this._form.hass = this._hass;
  }
}

customElements.define('catholic-daily-card-editor', CatholicDailyCardEditor);

// ─── Card Rendering ──────────────────────────────────────────────────────────

class CatholicDailyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._lastDate = null;
  }

  static getStubConfig() {
    return { layout: 'vertical' };
  }

  static getConfigElement() {
    return document.createElement('catholic-daily-card-editor');
  }

  setConfig(config) {
    this._config = normalizeCardConfig(config);
    this._lastDate = null; // force re-render when options change
    this._tryRender();
  }

  getCardSize() {
    return this._config?.layout === 'horizontal' ? 5 : 10;
  }

  // Sections dashboards ask the card how wide it wants to be. The horizontal
  // layout asks for the whole row — that is the entire point of it — so it no
  // longer needs `grid_options: columns: full` set by hand.
  getGridOptions() {
    return this._config?.layout === 'horizontal'
      ? { columns: 'full', rows: 'auto', min_columns: 6 }
      : { columns: 12, rows: 'auto', min_columns: 4 };
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._saintLoaded) {
      this._saintLoaded = true;
      this._loadSaint();
    }
    this._tryRender();
  }

  // The saint feed is fetched once per day and cached in localStorage. If the
  // network is unreachable (Home Assistant's CSP blocks some relays) we fall
  // back to the curated table, so a saint always renders.
  async _loadSaint() {
    const CACHE_KEY = 'catholic-daily-card-saint';
    let saint = null;

    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (c && c.key === saintTodayKey()) saint = c.saint;
    } catch (_) {}

    if (!saint) {
      saint = await fetchSaint();
      if (saint) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ key: saintTodayKey(), saint }));
        } catch (_) {}
      }
    }

    // The feed only gives a name and a blurb — the curated entry carries the
    // real rank, tags and quote, so let it win where the two overlap.
    const embedded = SAINTS[saintTodayKey()];
    if (saint && embedded) {
      saint.tags = embedded.tags;
      saint.feast = embedded.feast;
      if (!saint.quote) { saint.quote = embedded.quote; saint.quoteSource = embedded.quoteSource; }
    }

    this._saint = saint || embedded || {
      name: 'Saints of the Roman Calendar',
      feast: 'Feast Day',
      tags: ['Holy Men and Women'],
      bio: 'The Church honors saints every day of the year — holy men and women who bore witness to Christ through heroic virtue.',
      quote: 'To be a saint is not a luxury but a necessity.',
      quoteSource: 'Pope St. John Paul II',
      url: 'https://www.catholic.org/saints/',
    };

    this._lastDate = null; // force a repaint now that the saint is known
    this._tryRender();
  }

  connectedCallback() {
    this._tryRender();
    this._scheduleRefresh();
  }

  _scheduleRefresh() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    setTimeout(() => {
      this._lastDate = null;
      this._tryRender();
      this._scheduleRefresh();
    }, midnight - now);
  }

  _getReadingsFromHass() {
    const sensor = this._hass?.states?.['sensor.usccb_daily_readings'];
    if (!sensor || sensor.state === 'unavailable') return null;
    const a = sensor.attributes;

    // Format A: pre-parsed fields
    if (a.gospel) {
      return {
        label:  a.label  || null,
        first:  a.first  || null,
        psalm:  a.psalm  || null,
        second: a.second || null,
        gospel: a.gospel,
        link:   a.link   || 'https://bible.usccb.org/bible/readings',
      };
    }

    // Format B: rss2json.com rest sensor — description holds the full HTML
    if (a.description) {
      const doc = new DOMParser().parseFromString(a.description, 'text/html');
      const link = a.link || 'https://bible.usccb.org/bible/readings';
      const label = (a.title || sensor.state || '')
        .replace(/^[A-Z][a-z]+ \d{1,2},?\s*\d{4}\s*[-–—]?\s*/i, '').trim() || null;
      const result = { label, link };

      // USCCB writes these headings inconsistently — "Reading 1" and
      // "Reading I" both appear, as does "First Reading" — so accept each
      // form. Check the second reading first so "Reading 2" can't be taken
      // for "Reading 1". "Gospel Acclamation" and "Alleluia" are not the
      // Gospel and must not overwrite it.
      for (const h4 of doc.querySelectorAll('h4')) {
        const heading = h4.textContent.replace(/\s+/g, ' ').trim();
        const citation = h4.querySelector('a')?.textContent?.replace(/\s+/g, ' ').trim() || '';
        if (!citation) continue;
        if (/^(Reading\s*(?:2|II)\b|Second\s+Reading)/i.test(heading))     result.second = citation;
        else if (/^(Reading\s*(?:1|I)\b|First\s+Reading)/i.test(heading))  result.first  = citation;
        else if (/Responsorial\s+Psalm/i.test(heading))                    result.psalm  = citation;
        else if (/^Gospel(?!\s*Acclamation)/i.test(heading))               result.gospel = citation;
      }

      return result.gospel ? result : null;
    }

    return null;
  }

  _tryRender() {
    const today = new Date().toDateString();
    const hassReadings = this._getReadingsFromHass();
    const readingsChanged =
      JSON.stringify(hassReadings) !== JSON.stringify(this._lastHassReadings);
    if (today === this._lastDate && !readingsChanged) return;
    this._lastDate = today;
    this._lastHassReadings = hassReadings;
    this._render(new Date());
  }

  _render(now) {
    const liturgy = getLiturgicalInfo(now);
    const readings = this._getReadingsFromHass() || getMassReadings(now, liturgy);
    const rosaryKey = DAY_TO_MYSTERY[now.getDay()];
    const rosary = ROSARY_MYSTERIES[rosaryKey];
    const prayer = getDailyPrayer(now, liturgy);
    const office = getDivineOffice(now, liturgy);
    const verse = getDailyVerse(now);

    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const accent = liturgy.color;
    const accentLight = accent + '22'; // ~13% opacity hex

    const cfg = this._config || normalizeCardConfig({});
    const horizontal = cfg.layout === 'horizontal';
    const open = cfg.start_collapsed ? '' : ' open';
    const hidden = cfg.start_collapsed ? ' hidden' : '';
    const columns = ['show_readings','show_rosary','show_prayer','show_saint']
      .filter(k => cfg[k]).length || 1;
    const readingsLink = (readings && readings.link) || 'https://bible.usccb.org/bible/readings';
    const readingsHtml = this._buildReadingsHtml(readings, now, liturgy, readingsLink);

    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :host { display: block; background: transparent; }

        .card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: var(--primary-text-color, #1a1a1a);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        /* ── Header ── */
        .header {
          background: linear-gradient(135deg, ${accent} 0%, ${accent}aa 100%);
          color: #fff;
          padding: 11px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .header-main {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }
        .header-icon { font-size: 19px; line-height: 1; }
        .header-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .header-date {
          font-size: 12px;
          opacity: 0.9;
          font-style: italic;
          font-weight: 300;
          text-align: right;
        }

        /* ── Season Bar ── */
        .season-bar {
          background: ${accent}18;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 800;
          color: ${accent};
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .cycle-badge {
          background: ${accent};
          color: #fff;
          border-radius: 20px;
          padding: 2px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* ── Scripture Verse ── */
        .verse-bar {
          padding: 12px 18px;
          background: ${accent}10;
          border-bottom: 1px solid rgba(128,128,128,0.15);
          text-align: center;
        }
        .verse-text {
          font-size: 13px;
          font-style: italic;
          font-family: Georgia, serif;
          line-height: 1.6;
          color: var(--primary-text-color, #1a1a1a);
          margin-bottom: 4px;
        }
        .verse-ref {
          font-size: 11px;
          font-weight: 700;
          color: ${accent};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── Section ── */
        .section {
          padding: 0;
          border-bottom: 1px solid rgba(128,128,128,0.15);
        }
        .section:last-child { border-bottom: none; }

        .section-toggle {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          color: ${accent};
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: inherit;
        }
        .section-toggle:hover { background: ${accent}08; }
        .section-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-chevron {
          font-size: 10px;
          transition: transform 0.2s;
          opacity: 0.7;
        }
        .section-chevron.open { transform: rotate(90deg); }
        .section-body {
          padding: 0 18px 16px;
        }
        .section-body.hidden { display: none; }

        /* ── Readings ── */
        .reading-feat {
          font-size: 13px;
          color: ${accent};
          font-weight: 700;
          margin-bottom: 12px;
          padding: 7px 12px;
          background: ${accent}18;
          border-radius: 8px;
          border-left: 3px solid ${accent};
        }
        .reading-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          padding: 9px 12px;
          background: rgba(255,255,255,0.07);
          border-radius: 10px;
          border: 1px solid rgba(128,128,128,0.12);
        }
        .reading-label {
          background: ${accent};
          color: #fff;
          border-radius: 5px;
          padding: 3px 9px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          white-space: nowrap;
          flex-shrink: 0;
          min-width: 82px;
          text-align: center;
        }
        .reading-ref a {
          font-style: italic;
          font-size: 14px;
          font-weight: 500;
          color: inherit;
          text-decoration: none;
        }
        .reading-ref a:hover { text-decoration: underline; color: ${accent}; }
        .weekday-note { font-size: 13px; line-height: 1.6; }
        .weekday-note a { color: ${accent}; }

        @media (prefers-color-scheme: dark) {
          .card { background: rgba(0,0,0,0.25); }
          .reading-row { background: rgba(255,255,255,0.05); }
          .prayer-text { color: var(--primary-text-color, #e8e8e8); }
          .verse-text { color: var(--primary-text-color, #e8e8e8); }
        }
        :root[data-theme="dark"] .card { background: rgba(0,0,0,0.25); }
        :root[data-theme="dark"] .reading-row { background: rgba(255,255,255,0.05); }
        :root[data-theme="dark"] .prayer-text { color: var(--primary-text-color, #e8e8e8); }
        :root[data-theme="dark"] .verse-text { color: var(--primary-text-color, #e8e8e8); }

        /* ── Rosary ── */
        .rosary-wrap {
          text-align: center;
          padding: 6px 0;
        }
        .rosary-mystery-name {
          font-size: 21px;
          font-weight: 700;
          color: ${accent};
          font-family: Georgia, serif;
          margin-bottom: 4px;
        }
        .rosary-days {
          font-size: 11px;
          color: var(--secondary-text-color, #999);
          font-style: italic;
        }

        /* ── Prayer ── */
        .prayer-name {
          font-size: 17px;
          font-weight: 700;
          font-family: Georgia, serif;
          margin-bottom: 2px;
        }
        .prayer-lang {
          font-size: 10px;
          color: var(--secondary-text-color, #999);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        details.prayer-details { margin-top: 10px; }
        details.prayer-details summary {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: ${accent};
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          list-style: none;
          user-select: none;
          padding: 4px 0;
        }
        details.prayer-details summary::-webkit-details-marker { display: none; }
        details.prayer-details summary::before { content: '▶'; font-size: 10px; }
        details.prayer-details[open] summary::before { content: '▼'; }
        .prayer-text {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.9;
          white-space: pre-wrap;
          background: ${accent}11;
          padding: 14px 16px;
          border-radius: 10px;
          border-left: 3px solid ${accent};
          font-family: Georgia, serif;
        }

        /* ── Saint of the Day ── */
        .saint-art {
          height: ${cfg.saint_image_height}px;
          margin-bottom: 12px;
          border-radius: 12px;
          overflow: hidden;
          background: ${accent}12;
          display: ${cfg.saint_image ? 'block' : 'none'};
        }
        .saint-art img, .saint-art svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
        }
        .saint-name {
          font-size: 17px;
          font-weight: 700;
          font-family: Georgia, serif;
          line-height: 1.3;
          margin-bottom: 4px;
        }
        .saint-feast {
          font-size: 10px;
          color: var(--secondary-text-color, #999);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .saint-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 10px;
        }
        .saint-tag {
          background: ${accent}1e;
          border: 1px solid ${accent}55;
          color: ${accent};
          border-radius: 20px;
          padding: 2px 9px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .saint-bio {
          font-size: 13px;
          line-height: 1.65;
        }
        .saint-quote {
          margin-top: 10px;
          padding: 10px 14px;
          background: ${accent}11;
          border-left: 3px solid ${accent};
          border-radius: 10px;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 13px;
          line-height: 1.6;
        }
        .saint-quote-src {
          display: block;
          margin-top: 5px;
          font-style: normal;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${accent};
        }
        .saint-link {
          display: inline-block;
          margin-top: 10px;
          font-size: 12px;
          color: ${accent};
          text-decoration: none;
        }
        .saint-link:hover { text-decoration: underline; }

        /* ── Horizontal layout ── */
        .card.horizontal .topbar {
          border-bottom: 1px solid rgba(128,128,128,0.15);
          background: ${accent}10;
          padding: 10px 18px;
          text-align: center;
        }
        .card.horizontal .topbar .season-bar {
          justify-content: center;
          padding: 0 0 6px;
          background: none;
        }
        .card.horizontal .topbar .verse-bar {
          border-bottom: none;
          background: none;
          padding: 0;
        }
        .card.horizontal .verse-text { font-size: 12px; margin-bottom: 2px; }
        .card.horizontal .body {
          display: grid;
          grid-template-columns: repeat(${columns}, 1fr);
        }
        .card.horizontal .body .section {
          border-bottom: none;
          border-right: 1px solid rgba(128,128,128,0.15);
          min-width: 0;
        }
        .card.horizontal .body .section:last-child { border-right: none; }
        .card.horizontal .reading-label { min-width: 0; font-size: 9px; padding: 3px 7px; }
        .card.horizontal .reading-ref a { font-size: 13px; }
        .card.horizontal .rosary-mystery-name { font-size: 18px; }

        @media (max-width: 640px) {
          .card.horizontal .body { grid-template-columns: 1fr; }
          .card.horizontal .body .section {
            border-right: none;
            border-bottom: 1px solid rgba(128,128,128,0.15);
          }
          .card.horizontal .topbar { display: block; }
        }
      </style>

      <div class="card${horizontal ? ' horizontal' : ''}">

        <div class="header">
          <div class="header-main">
            <div class="header-icon">🙏</div>
            <div class="header-title">Daily Prayer</div>
          </div>
          <div class="header-date">${dayName}, ${dateStr}</div>
        </div>

        <div class="topbar">
        <div class="season-bar">
          <span>${this._seasonIcon(liturgy.season)}</span>
          <span>${liturgy.seasonLabel}</span>
          <span class="cycle-badge">Year ${liturgy.cycle}</span>
        </div>

${cfg.show_verse ? `        <div class="verse-bar">
          <div class="verse-text">&ldquo;${verse.text}&rdquo;</div>
          <div class="verse-ref">— ${verse.ref} (RSV-CE)</div>
        </div>` : ''}
        </div>

        <div class="body">
${cfg.show_readings ? `        <div class="section">
          <button class="section-toggle" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.section-chevron').classList.toggle('open')">
            <span class="section-left"><span>📖</span> Daily Mass Readings</span>
            <span class="section-chevron${open}">▶</span>
          </button>
          <div class="section-body${hidden}">
            ${readingsHtml}
          </div>
        </div>` : ''}

${cfg.show_rosary ? `        <div class="section">
          <button class="section-toggle" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.section-chevron').classList.toggle('open')">
            <span class="section-left"><span>📿</span> Mysteries of the Rosary</span>
            <span class="section-chevron${open}">▶</span>
          </button>
          <div class="section-body${hidden}">
            <div class="rosary-wrap">
              <div class="rosary-mystery-name">${rosary.subtitle}</div>
              <div class="rosary-days">${rosary.days}</div>
            </div>
          </div>
        </div>` : ''}

${cfg.show_prayer ? `        <div class="section">
          <button class="section-toggle" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.section-chevron').classList.toggle('open')">
            <span class="section-left"><span>🙏</span> Prayer for Little Ones</span>
            <span class="section-chevron${open}">▶</span>
          </button>
          <div class="section-body${hidden}">
            <div class="prayer-name">${prayer.name}</div>
            <div class="prayer-lang">${prayer.language}</div>
            <details class="prayer-details">
              <summary>Show Prayer</summary>
              <div class="prayer-text">${this._escapeHtml(prayer.text)}</div>
            </details>
          </div>
        </div>` : ''}

${cfg.show_saint ? `        <div class="section">
          <button class="section-toggle" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.section-chevron').classList.toggle('open')">
            <span class="section-left"><span>👑</span> Saint of the Day</span>
            <span class="section-chevron${open}">▶</span>
          </button>
          <div class="section-body${hidden}">
            ${this._buildSaintHtml()}
          </div>
        </div>` : ''}
        </div>

      </div>
    `;
  }

  _buildReadingsHtml(readings, date, liturgy, link) {
    const { cycle, weekdayCycle, week, season } = liturgy;
    const href = link || 'https://bible.usccb.org/bible/readings';

    // Render whatever citations we have — a weekday with no second reading,
    // or a feed that omits one heading, should still show the rest.
    if (readings && (readings.first || readings.gospel)) {
      const feat = readings.label ? `<div class="reading-feat">${readings.label}</div>` : '';
      const row = (label, ref) => ref ? `
        <div class="reading-row">
          <span class="reading-label">${label}</span>
          <span class="reading-ref"><a href="${href}" target="_blank" rel="noopener">${ref}</a></span>
        </div>` : '';
      return `
        ${feat}
        ${row('First Reading', readings.first)}
        ${row('Psalm', readings.psalm)}
        ${row('Second Reading', readings.second)}
        ${row('Gospel', readings.gospel)}
      `;
    }

    if (season === 'triduum') {
      return `<div class="weekday-note">
        The Sacred Triduum has its own unique liturgy.<br>
        Refer to your parish's Holy Week schedule or visit
        <a href="https://bible.usccb.org/bible/readings" target="_blank" rel="noopener">usccb.org/readings</a>.
      </div>`;
    }

    // Weekday or unmatched Sunday
    const seasonLabel = liturgy.seasonLabel || 'Ordinary Time';
    return `<div class="weekday-note">
      <strong>Weekday — Lectionary Cycle ${weekdayCycle}</strong><br>
      ${seasonLabel}, Week ${week}<br><br>
      For today's weekday readings, visit:<br>
      <a href="https://bible.usccb.org/bible/readings" target="_blank" rel="noopener">
        bible.usccb.org/bible/readings
      </a>
    </div>`;
  }

  _buildSaintHtml() {
    const s = this._saint;
    if (!s) return `<div class="saint-bio">Loading today's saint…</div>`;
    const e = (t) => this._escapeHtml(String(t));

    const tags = (s.tags || [])
      .map(t => `<span class="saint-tag">${e(t)}</span>`).join('');

    const quote = s.quote ? `
      <div class="saint-quote">
        &ldquo;${e(s.quote)}&rdquo;
        ${s.quoteSource ? `<span class="saint-quote-src">— ${e(s.quoteSource)}</span>` : ''}
      </div>` : '';

    const link = s.url
      ? `<a class="saint-link" href="${e(s.url)}" target="_blank" rel="noopener">Read more →</a>`
      : '';

    // A photo from the feed when there is one; the drawn archetype otherwise.
    // If the photo 404s the illustration is swapped in at load time.
    const art = s.imageUrl
      ? `<img src="${e(s.imageUrl)}" alt="${e(s.name)}" loading="lazy"
             onerror="this.parentElement.innerHTML=this.parentElement.dataset.fallback">`
      : getIllustration(s);

    return `
      <div class="saint-art" data-fallback="${e(getIllustration(s))}">${art}</div>
      <div class="saint-name">${e(s.name)}</div>
      ${s.feast ? `<div class="saint-feast">${e(s.feast)}</div>` : ''}
      ${tags ? `<div class="saint-tags">${tags}</div>` : ''}
      <div class="saint-bio">${e(s.bio || '')}</div>
      ${quote}
      ${link}
    `;
  }

  _seasonIcon(season) {
    const icons = {
      advent: '🕯️',
      christmas: '⭐',
      lent: '✝',
      triduum: '✝',
      easter: '🕊️',
      ordinary: '🌿',
      feast: '✨',
    };
    return icons[season] || '✝';
  }

  _escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// ─── Daily Scripture Verses (RSV-CE) ─────────────────────────────────────────
const SCRIPTURE_VERSES = [
  { text: "For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.", ref: "John 3:16" },
  { text: "I can do all things in him who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the LORD with all your heart, and do not rely on your own insight.", ref: "Proverbs 3:5" },
  { text: "The LORD is my shepherd, I shall not want.", ref: "Psalm 23:1" },
  { text: "Have no anxiety about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.", ref: "Philippians 4:6" },
  { text: "Love is patient and kind; love is not jealous or boastful.", ref: "1 Corinthians 13:4" },
  { text: "Be strong and of good courage; be not frightened, neither be dismayed; for the LORD your God is with you wherever you go.", ref: "Joshua 1:9" },
  { text: "Come to me, all who labor and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "Rejoice in the Lord always; again I will say, Rejoice.", ref: "Philippians 4:4" },
  { text: "The LORD is near to the brokenhearted, and saves the crushed in spirit.", ref: "Psalm 34:18" },
  { text: "For I know the plans I have for you, says the LORD, plans for welfare and not for evil, to give you a future and a hope.", ref: "Jeremiah 29:11" },
  { text: "Ask, and it will be given you; seek, and you will find; knock, and it will be opened to you.", ref: "Matthew 7:7" },
  { text: "But they who wait for the LORD shall renew their strength, they shall mount up with wings like eagles.", ref: "Isaiah 40:31" },
  { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
  { text: "Do not be conformed to this world but be transformed by the renewal of your mind.", ref: "Romans 12:2" },
  { text: "And we know that in everything God works for good with those who love him.", ref: "Romans 8:28" },
  { text: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105" },
  { text: "What does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?", ref: "Micah 6:8" },
  { text: "I am the way, and the truth, and the life; no one comes to the Father, but by me.", ref: "John 14:6" },
  { text: "Create in me a clean heart, O God, and put a new and right spirit within me.", ref: "Psalm 51:10" },
  { text: "Let your light so shine before men, that they may see your good works and give glory to your Father who is in heaven.", ref: "Matthew 5:16" },
  { text: "Cast your burden on the LORD, and he will sustain you.", ref: "Psalm 55:22" },
  { text: "The peace of God, which passes all understanding, will keep your hearts and your minds in Christ Jesus.", ref: "Philippians 4:7" },
  { text: "This is the day which the LORD has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
  { text: "For nothing will be impossible with God.", ref: "Luke 1:37" },
  { text: "I am the resurrection and the life; he who believes in me, though he die, yet shall he live.", ref: "John 11:25" },
  { text: "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness.", ref: "Galatians 5:22" },
  { text: "In the beginning was the Word, and the Word was with God, and the Word was God.", ref: "John 1:1" },
  { text: "Behold, I stand at the door and knock; if any one hears my voice and opens the door, I will come in to him.", ref: "Revelation 3:20" },
  { text: "Whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.", ref: "Colossians 3:17" },
];

function getDailyVerse(date) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  return SCRIPTURE_VERSES[dayOfYear % SCRIPTURE_VERSES.length];
}

customElements.define('catholic-daily-card', CatholicDailyCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'catholic-daily-card',
  name: 'Catholic Daily Prayer',
  description: 'Displays the Catholic liturgical season, daily Mass readings, Rosary mysteries, a traditional prayer for children, and Divine Office references.',
  preview: false,
});
