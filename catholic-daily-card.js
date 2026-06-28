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

function getDivineOffice(liturgy) {
  const { season, week } = liturgy;
  const url = 'https://divineoffice.org/';
  let volume, seasonRef, psalterWeek;

  // Psalter cycles weeks 1-4 within each season
  const psalterNums = ['I', 'II', 'III', 'IV'];

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

  return { volume, seasonRef, psalterWeek, url };
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

// ─── Card Rendering ──────────────────────────────────────────────────────────

class CatholicDailyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._lastDate = null;
  }

  setConfig(config) {
    this._config = config || {};
    this._tryRender();
  }

  set hass(hass) {
    this._hass = hass;
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

  _tryRender() {
    const today = new Date().toDateString();
    if (today === this._lastDate) return;
    this._lastDate = today;
    this._render(new Date());
  }

  _render(now) {
    const liturgy = getLiturgicalInfo(now);
    const readings = getMassReadings(now, liturgy);
    const rosaryKey = DAY_TO_MYSTERY[now.getDay()];
    const rosary = ROSARY_MYSTERIES[rosaryKey];
    const prayer = getDailyPrayer(now, liturgy);
    const office = getDivineOffice(liturgy);

    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const accent = liturgy.color;
    const accentLight = accent + '22'; // ~13% opacity hex

    const readingsHtml = this._buildReadingsHtml(readings, now, liturgy);

    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :host { display: block; }

        .card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          font-family: Georgia, 'Times New Roman', serif;
          color: #1a1a1a;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        /* ── Header ── */
        .header {
          background: ${accent};
          color: #fff;
          padding: 20px 24px 16px;
          text-align: center;
          position: relative;
        }
        .header-symbols {
          font-size: 22px;
          letter-spacing: 8px;
          opacity: 0.9;
          margin-bottom: 6px;
        }
        .header-title {
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .header-date {
          font-size: 13px;
          opacity: 0.85;
          margin-top: 4px;
          font-style: italic;
        }

        /* ── Season Badge ── */
        .season-bar {
          background: ${accentLight};
          border-left: 5px solid ${accent};
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: bold;
          color: ${accent};
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .season-icon { font-size: 18px; }

        /* ── Section ── */
        .section {
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        .section:last-child { border-bottom: none; }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: ${accent};
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .section-header-icon { font-size: 16px; }

        /* ── Readings ── */
        .reading-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 4px 12px;
          align-items: start;
          margin-bottom: 6px;
          font-size: 13px;
          line-height: 1.4;
        }
        .reading-label {
          color: #888;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-top: 1px;
        }
        .reading-ref {
          color: #1a1a1a;
          font-style: italic;
        }
        .reading-feat {
          font-size: 13px;
          color: ${accent};
          font-weight: bold;
          margin-bottom: 8px;
        }
        .weekday-note {
          font-size: 13px;
          color: #555;
          line-height: 1.6;
        }
        .weekday-note a { color: ${accent}; }

        /* ── Rosary ── */
        .rosary-mystery-name {
          font-size: 20px;
          font-weight: bold;
          color: ${accent};
          text-align: center;
          padding: 10px 0 4px;
          letter-spacing: 0.5px;
        }
        .rosary-days {
          font-size: 11px;
          color: #999;
          text-align: center;
          font-style: italic;
        }

        /* ── Prayer ── */
        .prayer-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 2px;
        }
        .prayer-lang {
          font-size: 11px;
          color: #999;
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
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          list-style: none;
          user-select: none;
          padding: 4px 0;
        }
        details.prayer-details summary::-webkit-details-marker { display: none; }
        details.prayer-details summary::before {
          content: '▶';
          font-size: 10px;
          transition: transform 0.2s;
        }
        details.prayer-details[open] summary::before {
          content: '▼';
        }
        .prayer-text {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.9;
          color: #333;
          white-space: pre-wrap;
          background: ${accentLight};
          padding: 12px 16px;
          border-radius: 8px;
          border-left: 3px solid ${accent};
        }

        /* ── Divine Office ── */
        .office-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .office-volume {
          font-size: 16px;
          font-weight: bold;
          color: ${accent};
        }
        .office-season {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        .psalter-badge {
          display: inline-block;
          background: ${accent};
          color: #fff;
          border-radius: 6px;
          padding: 2px 10px;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .hours-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .hours-table tr {
          border-bottom: 1px solid #f0f0f0;
        }
        .hours-table tr:last-child { border-bottom: none; }
        .hours-table td {
          padding: 6px 4px;
          vertical-align: middle;
        }
        .hours-table .hour-icon { width: 24px; font-size: 15px; }
        .hours-table .hour-name {
          color: #333;
          font-weight: bold;
          width: 130px;
        }
        .hours-table .hour-latin {
          color: #999;
          font-style: italic;
          font-size: 11px;
        }
        .office-link {
          margin-top: 12px;
        }
        .office-link a {
          color: ${accent};
          text-decoration: none;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid ${accent};
          padding: 4px 12px;
          border-radius: 20px;
        }
        .office-link a:hover { background: ${accentLight}; }
        .office-note {
          font-size: 10px;
          color: #bbb;
          margin-top: 8px;
          line-height: 1.4;
        }

        .cycle-badge {
          display: inline-block;
          background: ${accentLight};
          color: ${accent};
          border: 1px solid ${accent};
          border-radius: 12px;
          padding: 1px 10px;
          font-size: 11px;
          font-weight: bold;
          margin-left: 8px;
          vertical-align: middle;
        }

        /* ── Footer ── */
        .footer {
          background: #f9f9f9;
          padding: 8px 20px;
          text-align: center;
          font-size: 10px;
          color: #bbb;
          letter-spacing: 0.5px;
        }

        /* ── Cross SVG ── */
        .cross-symbol {
          display: inline-block;
          vertical-align: middle;
        }
      </style>

      <div class="card">

        <!-- Header -->
        <div class="header">
          <div class="header-symbols">✝ ☧ ✝</div>
          <div class="header-title">Family Daily Prayer</div>
          <div class="header-date">${dayName}, ${dateStr}</div>
        </div>

        <!-- Season -->
        <div class="season-bar">
          <span class="season-icon">${this._seasonIcon(liturgy.season)}</span>
          <span>${liturgy.seasonLabel}
            <span class="cycle-badge">Year ${liturgy.cycle}</span>
          </span>
        </div>

        <!-- Mass Readings -->
        <div class="section">
          <div class="section-header">
            <span class="section-header-icon">📖</span>
            Daily Mass Readings
          </div>
          ${readingsHtml}
        </div>

        <!-- Rosary -->
        <div class="section">
          <div class="section-header">
            <span class="section-header-icon">📿</span>
            Mysteries of the Rosary
          </div>
          <div class="rosary-mystery-name">📿 ${rosary.subtitle}</div>
          <div class="rosary-days">${rosary.days}</div>
        </div>

        <!-- Children's Prayer -->
        <div class="section">
          <div class="section-header">
            <span class="section-header-icon">🙏</span>
            Prayer for Little Ones (Ages 8 &amp; Under)
          </div>
          <div class="prayer-name">${prayer.name}</div>
          <div class="prayer-lang">${prayer.language}</div>
          <details class="prayer-details">
            <summary>Show Prayer</summary>
            <div class="prayer-text">${this._escapeHtml(prayer.text)}</div>
          </details>
        </div>

        <!-- Divine Office -->
        <div class="section">
          <div class="section-header">
            <span class="section-header-icon">🕐</span>
            Liturgy of the Hours (For Parents)
          </div>
          <div class="office-header">
            <div class="office-volume">${office.volume}</div>
            <div class="office-season">${office.seasonRef}</div>
          </div>
          ${office.psalterWeek ? `<div class="psalter-badge">Psalter Week ${office.psalterWeek}</div>` : ''}
          <table class="hours-table">
            <tr>
              <td class="hour-icon">🌙</td>
              <td class="hour-name">Office of Readings</td>
              <td class="hour-latin">Officium Lectionis</td>
            </tr>
            <tr>
              <td class="hour-icon">🌅</td>
              <td class="hour-name">Morning Prayer</td>
              <td class="hour-latin">Laudes</td>
            </tr>
            <tr>
              <td class="hour-icon">☀️</td>
              <td class="hour-name">Midday Prayer</td>
              <td class="hour-latin">Hora Media</td>
            </tr>
            <tr>
              <td class="hour-icon">🌇</td>
              <td class="hour-name">Evening Prayer</td>
              <td class="hour-latin">Vespers</td>
            </tr>
            <tr>
              <td class="hour-icon">🌃</td>
              <td class="hour-name">Night Prayer</td>
              <td class="hour-latin">Compline</td>
            </tr>
          </table>
          <div class="office-link">
            <a href="${office.url}" target="_blank" rel="noopener">
              Open divineoffice.org →
            </a>
          </div>
          <div class="office-note">
            Use the Psalter Week tab in your book to locate each Hour.
            Page numbers vary by edition.
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          ✝ &nbsp; Ora et Labora &nbsp; ✝ &nbsp; Refreshes daily at midnight
        </div>

      </div>
    `;
  }

  _buildReadingsHtml(readings, date, liturgy) {
    const isSunday = date.getDay() === 0;
    const { cycle, weekdayCycle, week, season } = liturgy;

    if (readings && readings.first) {
      const feat = readings.label ? `<div class="reading-feat">${readings.label}</div>` : '';
      return `
        ${feat}
        <div class="reading-row">
          <span class="reading-label">First Reading</span>
          <span class="reading-ref">${readings.first}</span>
        </div>
        <div class="reading-row">
          <span class="reading-label">Psalm</span>
          <span class="reading-ref">${readings.psalm}</span>
        </div>
        ${readings.second ? `<div class="reading-row">
          <span class="reading-label">Second Reading</span>
          <span class="reading-ref">${readings.second}</span>
        </div>` : ''}
        <div class="reading-row">
          <span class="reading-label">Gospel</span>
          <span class="reading-ref">${readings.gospel}</span>
        </div>
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
      .replace(/>/g, '&gt;');
  }
}

customElements.define('catholic-daily-card', CatholicDailyCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'catholic-daily-card',
  name: 'Catholic Daily Prayer',
  description: 'Displays the Catholic liturgical season, daily Mass readings, Rosary mysteries, a traditional prayer for children, and Divine Office references.',
  preview: false,
});
